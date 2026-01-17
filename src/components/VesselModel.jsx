import { useRef, useMemo, Suspense, Component, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Error boundary for GLTF loading
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('GLTF loading error:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

// Fallback geometry for when model doesn't load
const FallbackVessel = ({ vessel }) => {
  const meshRef = useRef()
  
  const vesselGeometry = useMemo(() => {
    const isAUV = vessel.type === 'AUV'
    if (isAUV) {
      // AUV shape - more streamlined
      const shape = new THREE.Shape()
      shape.moveTo(0, 0)
      shape.lineTo(1.5, 0.4)
      shape.lineTo(3, 0.6)
      shape.lineTo(4.5, 0.7)
      shape.lineTo(6, 0.6)
      shape.lineTo(7.5, 0.4)
      shape.lineTo(7.5, -0.4)
      shape.lineTo(6, -0.6)
      shape.lineTo(4.5, -0.7)
      shape.lineTo(3, -0.6)
      shape.lineTo(1.5, -0.4)
      shape.lineTo(0, 0)

      const extrudeSettings = {
        depth: 1.2,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.08,
        bevelSegments: 3,
      }
      return new THREE.ExtrudeGeometry(shape, extrudeSettings)
    } else {
      // ASV shape - wider, boat-like
      const shape = new THREE.Shape()
      shape.moveTo(0, 0)
      shape.lineTo(2, 0.6)
      shape.lineTo(4, 0.9)
      shape.lineTo(6, 1.0)
      shape.lineTo(8, 0.9)
      shape.lineTo(10, 0.6)
      shape.lineTo(10, -0.3)
      shape.lineTo(8, -0.6)
      shape.lineTo(6, -0.7)
      shape.lineTo(4, -0.6)
      shape.lineTo(2, -0.3)
      shape.lineTo(0, 0)

      const extrudeSettings = {
        depth: 2.0,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 3,
      }
      return new THREE.ExtrudeGeometry(shape, extrudeSettings)
    }
  }, [vessel.type])

  return (
    <mesh ref={meshRef} geometry={vesselGeometry}>
      <meshStandardMaterial
        color={vessel.type === 'AUV' ? "#3b82f6" : "#60a5fa"}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Load GLTF model component
const GLTFVessel = ({ vessel, modelPath }) => {
  const { scene } = useGLTF(modelPath)
  const clonedScene = useMemo(() => {
    if (!scene) return null
    const cloned = scene.clone()
    // Use individual scale from vessel data, or default based on type
    const scale = vessel.scale !== undefined ? vessel.scale : (vessel.type === 'AUV' ? 0.5 : 0.8)
    cloned.scale.set(scale, scale, scale)
    return cloned
  }, [scene, vessel.type, vessel.scale])
  
  if (!clonedScene) {
    return <FallbackVessel vessel={vessel} />
  }
  
  return <primitive object={clonedScene} />
}

const VesselModel = ({ vessel, scrollProgress, isActive }) => {
  const groupRef = useRef()

  // Set initial rotation from vessel data
  useEffect(() => {
    if (groupRef.current && vessel.rotation) {
      groupRef.current.rotation.set(...vessel.rotation)
    }
  }, [vessel.rotation])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      const isAUV = vessel.type === 'AUV'
      
      // Base position from vessel data
      const baseY = vessel.position[1]
      
      // Floating animation - different for ASV vs AUV
      if (isAUV) {
        // AUVs float underwater with less movement
        groupRef.current.position.y = baseY + Math.sin(time * 0.3) * 0.2
      } else {
        // ASVs float on surface with more movement
        groupRef.current.position.y = baseY + Math.sin(time * 0.5) * 0.4
      }
      
      // Apply base rotation from vessel data, then add gentle animation
      if (vessel.rotation) {
        const [baseRotX, baseRotY, baseRotZ] = vessel.rotation
        
        // Check if this is Kurma (needs special handling - Z-axis rotation instead of Y-axis)
        const isKurma = vessel.name === 'Kurma ASV'
        
        if (isKurma) {
          // Kurma: X-axis fixed to compensate for model offset, Y-axis fixed, Z-axis rotates
          groupRef.current.rotation.x = baseRotX // Keep base rotation (compensates for model's built-in offset)
          groupRef.current.rotation.y = baseRotY // Keep base rotation (no Y-axis rotation)
          // Z-axis gets the gentle rotation animation (like Y-axis for other vessels)
          groupRef.current.rotation.z = baseRotZ - time * 0.05 + (isActive ? scrollProgress * Math.PI * 2 : 0)
        } else {
          // Other vessels: normal Y-axis rotation with wave animations
          // Add gentle rotation animation on top of base rotation
          groupRef.current.rotation.y = baseRotY + time * 0.05 + (isActive ? scrollProgress * Math.PI * 2 : 0)
          
          // Add slight pitch from waves (more for ASVs) on top of base rotation
          groupRef.current.rotation.x = baseRotX + Math.sin(time * 0.3) * (isAUV ? 0.05 : 0.1)
          
          // Add slight roll for ASVs on top of base rotation
          if (!isAUV) {
            groupRef.current.rotation.z = baseRotZ + Math.sin(time * 0.4) * 0.05
          } else {
            groupRef.current.rotation.z = baseRotZ
          }
        }
      } else {
        // Fallback if no rotation specified
        groupRef.current.rotation.y = time * 0.05 + (isActive ? scrollProgress * Math.PI * 2 : 0)
        groupRef.current.rotation.x = Math.sin(time * 0.3) * (isAUV ? 0.05 : 0.1)
        if (!isAUV) {
          groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.05
        }
      }
    }

  })

  return (
    <group ref={groupRef} position={vessel.position}>
      <Suspense fallback={<FallbackVessel vessel={vessel} />}>
        <ErrorBoundary fallback={<FallbackVessel vessel={vessel} />}>
          <GLTFVessel vessel={vessel} modelPath={vessel.modelPath} />
        </ErrorBoundary>
      </Suspense>
      

      {/* Lights on vessel */}
      {isActive && (
        <>
          <pointLight 
            position={[2, 0.5, 0]} 
            intensity={0.8} 
            color="#60a5fa" 
            distance={10}
          />
          <pointLight 
            position={[-2, 0.5, 0]} 
            intensity={0.8} 
            color="#60a5fa" 
            distance={10}
          />
        </>
      )}
    </group>
  )
}

// Preload models
useGLTF.preload('/models/kurma_kvlcc2/scene.gltf')
useGLTF.preload('/models/240108_matsya_kcs_hull/scene.gltf')
useGLTF.preload('/models/makara_onrt__hull/scene.gltf')
useGLTF.preload('/models/auv_mavy/scene.gltf')
useGLTF.preload('/models/AUV_Dhwani/scene.gltf')

export default VesselModel
