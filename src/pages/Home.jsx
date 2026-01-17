import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import WaterScene from '../components/WaterScene'
import VesselModel from '../components/VesselModel'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Vessels in order: ASVs first, then AUVs
// Each vessel has its own individual scale - adjust each scale value independently
const vessels = [
  { id: 1, name: 'Kurma ASV', type: 'ASV', position: [-20,-0.5,0], rotation: [Math.PI/2, 0, 0], modelPath: '/models/kurma_kvlcc2/scene.gltf', scale: 0.004 }, // Compensate for model's built-in 90° X-axis offset
  { id: 2, name: 'MAtsya ASV', type: 'ASV', position: [0, 0.3,0], rotation: [0, Math.PI, 0], modelPath: '/models/240108_matsya_kcs_hull/scene.gltf', scale: 0.022 },
  { id: 3, name: 'Makara ASV', type: 'ASV', position: [20, 0.3,0], rotation: [0, 0, 0], modelPath: '/models/makara_onrt__hull/scene.gltf', scale: 0.004 },
  { id: 4, name: 'MAVY mini AUV', type: 'AUV', position: [0, -5, 0], rotation: [0, 0, 0], modelPath: '/models/auv_mavy/scene.gltf', scale: 0.005 },
  { id: 5, name: 'DHWANI AUV', type: 'AUV', position: [10, -5, 0], rotation: [0, Math.PI/2, 0], modelPath: '/models/AUV_Dhwani/scene.gltf', scale: 0.005 },
]

const Home = () => {
  const [currentVesselIndex, setCurrentVesselIndex] = useState(0)
  const [cameraTarget, setCameraTarget] = useState({ position: [0, 10, 20], lookAt: [0, 0, 0] })
  const controlsRef = useRef()

  // Update camera when vessel changes
  useEffect(() => {
    const currentVessel = vessels[currentVesselIndex]
    if (!currentVessel) return
    
    const isAUV = currentVessel.type === 'AUV'
    const vesselPos = currentVessel.position
    const baseDistance = isAUV ? 12 : 15
    
    const cameraY = isAUV ? vesselPos[1] + 3 : vesselPos[1] + 8
    const cameraZ = vesselPos[2] + baseDistance
    
    setCameraTarget({
      position: [vesselPos[0], cameraY, cameraZ],
      lookAt: vesselPos
    })

    // Disable controls when viewing a vessel
    if (controlsRef.current) {
      controlsRef.current.enabled = false
    }
  }, [currentVesselIndex])

  // Auto-advance vessels every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVesselIndex((prev) => (prev + 1) % vessels.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleVesselClick = (index) => {
    setCurrentVesselIndex(index)
  }

  const handleNext = () => {
    setCurrentVesselIndex((prev) => (prev + 1) % vessels.length)
  }

  const handlePrev = () => {
    setCurrentVesselIndex((prev) => (prev - 1 + vessels.length) % vessels.length)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-ocean-dark to-ocean-medium">
      {/* First Section - Image with Text Overlay */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/mavlabfirstpage.jpg"
            alt="MAVLab"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/80 via-ocean-dark/60 to-ocean-dark/40"></div>
        </div>
        
        {/* Content Overlay - Text on Right */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 w-full">
            <div className="flex justify-end">
              <div className="max-w-2xl text-right">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 flex justify-end"
                >
                  <img
                    src="/images/logo.jpeg"
                    alt="MAVLab Logo"
                    className="h-20 md:h-28 w-auto mb-6"
                  />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
                >
                  Marine Autonomous Vehicles Lab
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl lg:text-2xl text-blue-200 leading-relaxed drop-shadow-lg"
                >
                  Pioneering the future of autonomous marine technology through innovation,
                  research, and excellence in underwater robotics.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Transition Gradient */}
      <div className="relative h-32 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark via-ocean-dark/80 to-ocean-dark/60"></div>
      </div>

      {/* Second Section - Three.js Scene */}
      <section className="relative h-screen w-full -mt-32">
        <Canvas
          camera={{ position: [0, 10, 20], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          
          <WaterScene />
          
          {/* Render all vessels */}
          {vessels.map((vessel) => (
            <VesselModel 
              key={vessel.id}
              vessel={vessel} 
              scrollProgress={0}
              isActive={vessel.id === vessels[currentVesselIndex].id}
            />
          ))}
          
          {/* Camera with smooth animation */}
          <CameraController target={cameraTarget} />
          
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={50}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>


        {/* Vessel Navigation Controls */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePrev}
              className="bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
            >
              ← Prev
            </button>
            
            <div className="flex space-x-2">
              {vessels.map((vessel, index) => (
                <button
                  key={vessel.id}
                  onClick={() => handleVesselClick(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentVesselIndex ? 'bg-blue-400 w-8' : 'bg-gray-500 w-2 hover:bg-gray-400'
                  }`}
                  title={vessel.name}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
            >
              Next →
            </button>
          </div>
          <p className="text-white text-center text-lg font-semibold drop-shadow-lg">
            {vessels[currentVesselIndex].name}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 bg-gradient-to-b from-ocean-dark to-ocean-medium">
        {/* About Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About MAVLab</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              The Marine Autonomous Vehicles Laboratory is at the forefront of autonomous
              marine technology research. We develop cutting-edge AUVs, ROVs, and USVs
              for various applications including ocean exploration, environmental monitoring,
              and underwater infrastructure inspection.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { title: 'Research Excellence', desc: 'Pioneering autonomous marine systems' },
              { title: 'Innovation', desc: 'State-of-the-art technology development' },
              { title: 'Competition', desc: 'Leading in international robotics competitions' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-ocean-light/50 p-6 rounded-lg backdrop-blur-sm border border-blue-500/20"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/images/DSC04436.JPG',
              '/images/DSC05111.JPG',
              '/images/DSC06275.JPG',
              '/images/IMG20240204112157.jpg',
              '/images/IMG20240204130218.jpg',
              '/images/Screenshot from 2026-01-05 16-13-17.png',
            ].map((imagePath, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-video bg-ocean-light/30 rounded-lg overflow-hidden border border-blue-500/20 group cursor-pointer"
              >
                <img
                  src={imagePath}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Videos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { src: '/videos/Dr. Abhilash 10 Ship Simulator.mp4', title: 'Ship Simulator' },
              { src: '/videos/Makara trailer.mov', title: 'Makara Trailer' },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-video bg-ocean-light/30 rounded-lg overflow-hidden border border-blue-500/20"
              >
                <video
                  src={video.src}
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                  autoPlay={index === 0}
                  muted={index === 0}
                  loop={index === 0}
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section - At the End */}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-xl text-gray-300 mb-2">
              Always reach out to us at
            </p>
            <p className="text-2xl md:text-3xl text-blue-400 font-semibold mb-6">
              <a
                href="mailto:mav_abhilash@doe.iitm.ac.in"
                className="hover:text-blue-300 underline"
              >
                mav_abhilash@doe.iitm.ac.in
              </a>
            </p>
            <p className="text-lg text-gray-400">
              Department of Ocean Engineering, IIT Madras
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Location</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Department of Ocean Engineering</strong>
                <br />
                Indian Institute of Technology Madras
                <br />
                Chennai, Tamil Nadu 600036, India
              </p>
              <a
                href="mailto:mav_abhilash@doe.iitm.ac.in"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Email: mav_abhilash@doe.iitm.ac.in
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/20"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d80.2333!3d12.9914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sIIT%20Madras!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ minHeight: '300px', border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IIT Madras Ocean Engineering Department Location"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-blue-500/20">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>&copy; 2025 MAVLab - Marine Autonomous Vehicles Laboratory | MI</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Camera controller component
const CameraController = ({ target }) => {
  const { camera } = useThree()

  useFrame(() => {
    if (camera && target) {
      // Smooth camera interpolation
      const currentPos = camera.position
      const targetPos = new THREE.Vector3(...target.position)
      const currentLook = new THREE.Vector3(...target.lookAt)
      
      // Interpolate position
      currentPos.lerp(targetPos, 0.05)
      
      // Look at target
      camera.lookAt(currentLook)
    }
  })

  return null
}

export default Home
