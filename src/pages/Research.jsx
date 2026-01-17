import { motion } from 'framer-motion'

const Research = () => {
  const researchAreas = [
    {
      title: 'Autonomous Navigation',
      description: 'Developing advanced algorithms for underwater vehicle navigation using SLAM, sensor fusion, and AI.',
      technologies: ['SLAM', 'Sensor Fusion', 'Machine Learning', 'Computer Vision']
    },
    {
      title: 'Multi-Vehicle Coordination',
      description: 'Research on cooperative control and communication for teams of autonomous marine vehicles.',
      technologies: ['Swarm Robotics', 'Communication Protocols', 'Distributed Control']
    },
    {
      title: 'Underwater Perception',
      description: 'Computer vision and sensor processing for object detection and environmental mapping.',
      technologies: ['Computer Vision', 'Sonar Processing', 'Image Recognition', 'Deep Learning']
    },
    {
      title: 'AUV, ASV development',
      description: 'Designing and developing Autonomous Underwater Vehicles (AUVs) and Autonomous Surface Vehicles (ASVs) with advanced capabilities and robust systems.',
      technologies: ['Vehicle Design', 'System Integration', 'Testing & Validation', 'Prototyping']
    },
    {
      title: 'Ship Hydrodynamics',
      description: 'Studying the hydrodynamic behavior of ships and marine vessels, including resistance, propulsion, and seakeeping characteristics.',
      technologies: ['CFD Analysis', 'Model Testing', 'Hydrodynamic Design', 'Performance Optimization']
    },
    {
      title: 'Ship wave interaction',
      description: 'Research on the interaction between ships and waves, including wave resistance, wave-induced motions, and seakeeping performance.',
      technologies: ['Wave Theory', 'Seakeeping Analysis', 'Motion Prediction', 'Wave Loads']
    },
  ]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Research</h1>
          <p className="text-xl text-gray-300">
            Advancing the frontiers of marine autonomous vehicle technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-3">{area.title}</h2>
              <p className="text-gray-300 mb-4">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {area.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs text-blue-300 bg-blue-400/20 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-blue-500/20 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 MAVLab - Marine Autonomous Vehicles Laboratory | MI</p>
        </div>
      </footer>
    </div>
  )
}

export default Research

