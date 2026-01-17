import { motion } from 'framer-motion'

const Team = () => {
  const teamMembers = [
    {
      name: 'Dr. Abhilash Somayajula',
      role: 'Lab Director, Associate Professor- Ocean Engineering, IIT Madras',
      expertise: 'Hydrodynamics, Marine Robotics',
      email: 'abhilash@iitm.ac.in'
    }
  ]

  const phdMembers = [
    { name: 'Dr. Krishnavelu', role: 'PhD' },
    { name: 'Vallabh Deogaonkar', role: 'PhD' },
    { name: 'Sayan Chowdhury', role: 'PhD' },
  ]

  const projectStaff = [
    { name: 'Dr. Prabhakaran', role: 'Project Scientist' },
    { name: 'Aravind Yokesh', role: 'Project Staff' },
    { name: 'Deviyani', role: 'Project Staff' },
  ]

  const students = [
    { name: 'Mohammed Ibrahim M', role: 'Student' },
    { name: 'Aatmaj Bhayani', role: 'Student' },
    { name: 'Samyak Kumar', role: 'Student' },
    { name: 'Krish Mehta', role: 'Student' },
    { name: 'Mahav Sai', role: 'Student' },
    { name: 'Gurukeshav', role: 'Student' },
    { name: 'Aarav Patel', role: 'Student' },
    { name: 'Nirmal Kumaran', role: 'Student' },
    { name: 'Gowshik', role: 'Student' },
  ]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Team</h1>
          <p className="text-xl text-gray-300">
            Meet the people driving innovation in marine autonomous vehicles
          </p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8">Faculty</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <div className="w-20 h-20 bg-ocean-dark rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {index === 0 && member.name.includes('Abhilash') ? (
                    <img
                      src="/images/abhilash.jpeg"
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl text-blue-400">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                <p className="text-blue-400 text-center mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm text-center mb-3">{member.expertise}</p>
                <p className="text-gray-400 text-xs text-center">{member.email}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8">PhD Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phdMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 mb-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8">Project Staff</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectStaff.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 mb-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-400 mb-8">Students</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ocean-light/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <h3 className="text-lg font-bold text-white mb-1">{student.name}</h3>
                <p className="text-blue-400 mb-2">{student.role}</p>
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

export default Team

