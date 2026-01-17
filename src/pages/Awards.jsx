import { motion } from 'framer-motion'

const Awards = () => {
  const awards = [
    {
      title: '1st Place',
      competition: 'VRX 2023',
      year: '2023',
      description: '1st place in Virtual ASV competition from Openrobotics, USA',
      icon: '💡'
    },
    {
      title: '3rd Place',
      competition: 'Njord',
      year: '2023',
      description: 'ASV competition at Norway',
      icon: '🏆'
    },
    {
      title: '9th Place',
      competition: 'SAUVC 2023',
      year: '2023',
      description: 'AUV competition at Singapore',
      icon: '🎯'
    },
    {
      title: 'Competition organiser',
      competition: 'Aquavision 2025',
      year: '2025',
      description: 'IEEE AUV Competition, IIT MAdras',
      icon: '💡'
    },
    {
      title: 'Upcoming',
      competition: 'SAUVC 2026',
      year: '2026',
      description: 'final stage prepertaion',
      icon: '📄'
    },
    {
      title: 'upcoming',
      competition: 'NIDAR',
      year: '2026',
      description: 'Autonomous Drone Competition',
      icon: '⭐'
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Awards</h1>
          <p className="text-xl text-gray-300">
            Recognition for excellence in marine autonomous vehicle research
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{award.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-400 mb-2">{award.title}</h2>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold">{award.competition}</span> • {award.year}
                  </p>
                  <p className="text-gray-400 text-sm">{award.description}</p>
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

export default Awards

