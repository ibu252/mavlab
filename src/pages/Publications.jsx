import { motion } from 'framer-motion'

const Publications = () => {
  // Real publications from Abhilash Somayajula's Google Scholar profile
  // Source: https://scholar.google.co.in/citations?user=9HFX8qUAAAAJ&hl=en
  const publications = [
    {
      title: 'Navigating Uncertainty: Application of Information Theory for Ocean Exploration Using AUV',
      authors: 'Vallabh Deogaonkar, Atmanand M. A., Abhilash Somayajula, et al.',
      journal: 'Ocean Engineering / IIT Madras',
      year: '2025',
      doi: '',
      link: 'https://doe.iitm.ac.in/abhilash/'
    },
    {
      title: 'Model Predictive Path Integral Docking of Fully Actuated Surface Vessel',
      authors: 'Akash Vijayakumar, Atmanand M. A., Abhilash Somayajula',
      journal: 'IIT Madras / Catalyzex',
      year: '2025',
      doi: '',
      link: 'https://www.catalyzex.com/author/Abhilash%20Somayajula'
    },
    {
      title: 'Numerical Validation of Second-Order Wave Drift Forces Calculation for Floating Structures',
      authors: 'Krishnavelu Ramachandran, Abhilash Somayajula',
      journal: 'IIT Madras',
      year: '2024',
      doi: '',
      link: 'https://doe.iitm.ac.in/abhilash/'
    },
    {
      title: 'Data Driven Identification and Model Predictive Control for a Catamaran Surface Vessel',
      authors: 'Deogaonkar V., Ibrahim M., Vijayakumar A., Abhilash Somayajula',
      journal: 'IIT Madras',
      year: '2024',
      doi: '',
      link: 'https://www.abhilash.consulting/research/publications'
    },
    {
      title: 'Simulation-Based Analysis of Parametric Rolling in Head Sea Conditions',
      authors: 'Gangesh Kumar Agrahri, Abhilash Somayajula',
      journal: 'IIT Madras',
      year: '2024',
      doi: '',
      link: 'https://doe.iitm.ac.in/abhilash/'
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Publications</h1>
          <p className="text-xl text-gray-300 mb-4">
            Research contributions to the field of marine autonomous vehicles
          </p>
          <p className="text-sm text-blue-400">
            View all publications on{' '}
            <a
              href="https://scholar.google.co.in/citations?user=9HFX8qUAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-300"
            >
              Google Scholar
            </a>
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-3">{pub.title}</h2>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Authors:</span> {pub.authors}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Journal/Conference:</span> {pub.journal}
              </p>
              <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                <span className="text-gray-400">{pub.year}</span>
                <div className="flex gap-4 flex-wrap">
                  {pub.doi && (
                    <span className="text-blue-400 text-sm">DOI: {pub.doi}</span>
                  )}
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm underline"
                    >
                      View Publication →
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
            href="https://scholar.google.co.in/citations?user=9HFX8qUAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View All Publications on Google Scholar
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

export default Publications
