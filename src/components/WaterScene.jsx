import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useCubeTexture } from '@react-three/drei'
import * as THREE from 'three'

// Shader code as strings
const waterVertexShader = `
precision highp float;

uniform float uTime;
uniform float uWavesAmplitude;
uniform float uWavesSpeed;
uniform float uWavesFrequency;
uniform float uWavesPersistence;
uniform float uWavesLacunarity;
uniform float uWavesIterations;

varying vec3 vNormal;
varying vec3 vWorldPosition;

vec4 permute(vec4 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float getElevation(float x, float z) {
  vec2 pos = vec2(x, z);
  float elevation = 0.0;
  float amplitude = 1.0;
  float frequency = uWavesFrequency;
  vec2 p = pos.xy;

  for(float i = 0.0; i < uWavesIterations; i++) {
    float noiseValue = snoise(p * frequency + uTime * uWavesSpeed);
    elevation += amplitude * noiseValue;
    amplitude *= uWavesPersistence;
    frequency *= uWavesLacunarity;
  }

  elevation *= uWavesAmplitude;
  return elevation;
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = getElevation(modelPosition.x, modelPosition.z);
  modelPosition.y += elevation;

  float eps = 0.001;
  vec3 tangent = normalize(vec3(eps, getElevation(modelPosition.x - eps, modelPosition.z) - elevation, 0.0));
  vec3 bitangent = normalize(vec3(0.0, getElevation(modelPosition.x, modelPosition.z - eps) - elevation, eps));
  vec3 objectNormal = normalize(cross(tangent, bitangent));

  vNormal = objectNormal;
  vWorldPosition = modelPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`

const waterFragmentShader = `
precision highp float;

uniform float uOpacity;
uniform vec3 uTroughColor;
uniform vec3 uSurfaceColor;
uniform vec3 uPeakColor;
uniform float uPeakThreshold;
uniform float uPeakTransition;
uniform float uTroughThreshold;
uniform float uTroughTransition;
uniform float uFresnelScale;
uniform float uFresnelPower;
uniform samplerCube uEnvironmentMap;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
  vec3 reflectedDirection = reflect(viewDirection, vNormal);
  reflectedDirection.x = -reflectedDirection.x;

  vec4 reflectionColor = textureCube(uEnvironmentMap, reflectedDirection);
  float fresnel = uFresnelScale * pow(1.0 - clamp(dot(viewDirection, vNormal), 0.0, 1.0), uFresnelPower);

  float elevation = vWorldPosition.y;
  float peakFactor = smoothstep(uPeakThreshold - uPeakTransition, uPeakThreshold + uPeakTransition, elevation);
  float troughFactor = smoothstep(uTroughThreshold - uTroughTransition, uTroughThreshold + uTroughTransition, elevation);

  vec3 mixedColor1 = mix(uTroughColor, uSurfaceColor, troughFactor);
  vec3 mixedColor2 = mix(mixedColor1, uPeakColor, peakFactor);
  vec3 finalColor = mix(mixedColor2, reflectionColor.rgb, fresnel);

  gl_FragColor = vec4(finalColor, uOpacity);
}
`

const WaterScene = () => {
  const waterRef = useRef()
  const { scene } = useThree()
  
  // Load environment map as cube texture
  const envMap = useCubeTexture(
    ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
    { path: '/' }
  )

  // Create water material with shader
  const waterMaterial = useMemo(() => {
    if (!envMap) return null
    
    return new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.9 },
        uEnvironmentMap: { value: envMap },
        uWavesAmplitude: { value: 0.15 },
        uWavesFrequency: { value: 0.05 },
        uWavesPersistence: { value: 0.35 },
        uWavesLacunarity: { value: 2.0 },
        uWavesIterations: { value: 15 },
        uWavesSpeed: { value: 0.4 },
        uTroughColor: { value: new THREE.Color('#186691') },
        uSurfaceColor: { value: new THREE.Color('#9bd8c0') },
        uPeakColor: { value: new THREE.Color('#bbd8e0') },
        uPeakThreshold: { value: 0.12 },
        uPeakTransition: { value: 0.08 },
        uTroughThreshold: { value: -0.015 },
        uTroughTransition: { value: 0.2 },
        uFresnelScale: { value: 0.95 },
        uFresnelPower: { value: 0.5 }
      },
      transparent: true,
      depthTest: true,
      side: THREE.DoubleSide
    })
  }, [envMap])

  // Create water geometry
  const waterGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(1000, 1000, 512, 512)
  }, [])

  // Update water shader time
  useFrame((state) => {
    if (waterRef.current && waterMaterial) {
      waterMaterial.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  // Set environment map on scene
  useEffect(() => {
    if (envMap) {
      scene.environment = envMap
      scene.background = envMap
    }
  }, [envMap, scene])

  if (!waterMaterial) return null

  return (
    <group>
      {/* Water Plane with Shader */}
      <mesh
        ref={waterRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        geometry={waterGeometry}
        material={waterMaterial}
      />

      {/* Ocean Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -20, 0]}
      >
        <planeGeometry args={[2000, 2000]} />
        <meshStandardMaterial color="#0a1929" />
      </mesh>
    </group>
  )
}

export default WaterScene
