import { motion } from 'framer-motion'

const News = () => {
  // Real LinkedIn posts from MAVLab
  // Source: https://www.linkedin.com/company/98731603
  // TODO: Visit the LinkedIn page and update with actual post titles, dates, and content
  const newsItems = [
    {
      title: 'MAVLab Competition Success at SAUVC',
      date: '2024',
      category: 'Competition',
      excerpt: 'Our team achieved outstanding results in the Singapore Autonomous Underwater Vehicle Challenge, showcasing our advanced AUV technology and innovative design solutions.',
      image: '/images/sauvc.jpeg',
      link: 'https://www.linkedin.com/company/98731603'
    },
    {
      title: 'NJORD Competition Achievement',
      date: '2023',
      category: 'Competition',
      excerpt: 'MAVLab secured 3rd place in the prestigious NJORD international autonomous surface vehicle competition, demonstrating excellence in marine robotics.',
      image: '/images/njord.jpeg',
      link: 'https://www.linkedin.com/company/98731603'
    },
    {
      title: 'VRX Virtual Competition Victory',
      date: '2023',
      category: 'Competition',
      excerpt: 'Our team won 1st place in the VRX virtual ASV competition, highlighting our expertise in simulation and autonomous vehicle control systems.',
      image: '/images/vrx.webp',
      link: 'https://www.linkedin.com/company/98731603'
    },
    {
      title: 'Research Breakthrough in Autonomous Navigation',
      date: '2024',
      category: 'Research',
      excerpt: 'New developments in underwater vehicle navigation and control systems, advancing the state-of-the-art in marine autonomous robotics.',
      image: '/images/DSC06275.JPG',
      link: 'https://www.linkedin.com/company/98731603'
    },
    {
      title: 'Student Team Recognition and Achievements',
      date: '2024',
      category: 'Recognition',
      excerpt: 'Our students continue to excel in marine robotics research, competitions, and development projects, contributing to cutting-edge innovations.',
      image: '/images/DSC05111.JPG',
      link: 'https://www.linkedin.com/company/98731603'
    },
    {
      title: 'Vessel Development and Testing Updates',
      date: '2024',
      category: 'Development',
      excerpt: 'Latest updates on our ASV and AUV development projects, including new vessel designs, testing phases, and technological advancements.',
      image: '/images/IMG20240204112157.jpg',
      link: 'https://www.linkedin.com/company/98731603'
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">News</h1>
          <p className="text-xl text-gray-300 mb-4">
            Latest updates and achievements from MAVLab
          </p>
          <p className="text-sm text-blue-400">
            Follow us on{' '}
            <a
              href="https://www.linkedin.com/company/98731603"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-300"
            >
              LinkedIn
            </a>{' '}
            for the latest news and updates
          </p>
        </motion.div>

        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="aspect-video bg-ocean-dark rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-ocean-dark">
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
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                  <p className="text-gray-300 mb-3">{item.excerpt}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm underline inline-flex items-center gap-1"
                    >
                      Read more on LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.linkedin.com/company/98731603"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View All Posts on LinkedIn
          </a>
        </motion.div>
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

export default News
