import { motion } from 'framer-motion'

const Teams = () => {
  const teams = [
    {
      name: 'AUV Aritra Team',
      description: 'Autonomous Underwater Vehicle development and research',
      members: 12,
      focus: 'Navigation, Control Systems, Sensor Integration'
    },
    {
      name: 'ASV Aritra Team',
      description: 'ASV design and operation',
      members: 10,
      focus: 'Manipulation, Teleoperation, Underwater Robotics'
    },
    {
      name: 'Drone Aritra team',
      description: 'Unmanned arieal Vehicle research and development',
      members: 8,
      focus: 'Surface Navigation, Communication, Multi-vehicle Coordination'
    },
    {
      name: 'Amog team',
      description: 'AUV competition team',
      members: 15,
      focus: 'Machine Learning, Computer Vision, Path Planning'
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Teams</h1>
          <p className="text-xl text-gray-300">
            Our specialized teams working on cutting-edge marine robotics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-3">{team.name}</h2>
              <p className="text-gray-300 mb-4">{team.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Members:</span>
                  <span className="text-white font-semibold">{team.members}</span>
                </div>
                <div>
                  <span className="text-gray-400">Focus Areas:</span>
                  <p className="text-white mt-1">{team.focus}</p>
                </div>
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

export default Teams

