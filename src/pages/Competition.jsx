import { motion } from 'framer-motion'

const Competition = () => {
  const competitions = [
    {
      title: 'NJORD Competition',
      year: '2023',
      description: 'International autonomous surface vehicle competition',
      result: '3rd Place',
      image: '/images/njord.jpeg'
    },
    {
      title: 'SAUVC',
      year: '2023',
      description: 'Singapore Autonomous Underwater Vehicle Challenge',
      result: '2nd Place',
      image: '/images/sauvc.jpeg'
    },
    {
      title: 'VRX Competition',
      year: '2023',
      description: 'Virtual ASV competition',
      result: '1st Place',
      image: '/images/vrx.webp'
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Competitions</h1>
          <p className="text-xl text-gray-300">
            Showcasing our excellence in international robotics competitions
          </p>
        </motion.div>

        <div className="space-y-8">
          {competitions.map((competition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="aspect-video bg-ocean-dark rounded-lg overflow-hidden">
                    <img
                      src={competition.image}
                      alt={competition.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <svg class="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        `
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-3xl font-bold text-blue-400">{competition.title}</h2>
                    <span className="text-sm text-gray-400 bg-ocean-dark px-3 py-1 rounded">
                      {competition.year}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{competition.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-green-400">Result:</span>
                    <span className="text-lg text-white">{competition.result}</span>
                  </div>
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

export default Competition
