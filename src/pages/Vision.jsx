import { motion } from 'framer-motion'

const Vision = () => {
  const visionPoints = [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of what\'s possible in marine autonomous systems through cutting-edge research and development.',
      icon: '🚀'
    },
    {
      title: 'Excellence',
      description: 'Maintaining the highest standards in research, education, and competition performance.',
      icon: '⭐'
    },
    {
      title: 'Collaboration',
      description: 'Working with industry partners, research institutions, and students to advance marine robotics.',
      icon: '🤝'
    },
    {
      title: 'Education',
      description: 'Training the next generation of engineers and researchers in autonomous marine vehicle technology.',
      icon: '🎓'
    },
    {
      title: 'Impact',
      description: 'Contributing to ocean exploration, environmental monitoring, and underwater infrastructure maintenance.',
      icon: '🌊'
    },
    {
      title: 'Sustainability',
      description: 'Developing energy-efficient and environmentally responsible solutions for marine operations.',
      icon: '🌱'
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Vision & Mission</h1>
          <p className="text-xl text-gray-300">
            Our commitment to advancing marine autonomous vehicle technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/20 mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            The Marine Autonomous Vehicles Laboratory (MAVLab) is dedicated to advancing the
            state-of-the-art in autonomous marine vehicle technology through innovative research,
            excellence in education, and active participation in international competitions.
            We aim to develop reliable, efficient, and intelligent autonomous systems that can
            operate in challenging marine environments, contributing to ocean exploration,
            environmental monitoring, and underwater infrastructure maintenance.
          </p>
          <p className="text-lg text-blue-300 font-semibold">
            We are part of the Department of Ocean Engineering at Indian Institute of Technology Madras (IIT Madras).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/20 mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            To be a world-leading research laboratory in marine autonomous vehicle technology,
            recognized for our innovative contributions to the field, excellence in student
            education, and successful deployment of autonomous systems in real-world applications.
            We envision a future where autonomous marine vehicles are integral to ocean research,
            environmental protection, and sustainable marine operations.
          </p>
          <p className="text-lg text-blue-300 font-semibold">
            As part of IIT Madras, we leverage the institute's world-class infrastructure and 
            collaborative research environment to push the boundaries of marine robotics.
          </p>
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="text-2xl font-bold text-blue-400 mb-3">{point.title}</h3>
                <p className="text-gray-300">{point.description}</p>
              </motion.div>
            ))}
          </div>
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

export default Vision

