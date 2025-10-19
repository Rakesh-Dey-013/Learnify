import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const ProfileCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-tr from-zinc-900 to-violet-700/5 rounded-2xl p-6 border border-zinc-700 hover:border-zinc-500 transition-all duration-300 backdrop-blur-lg"
    >
      <div className="text-center">
        <img
          src={member.image}
          alt={member.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-zinc-600"
        />
        <h3 className="text-white font-semibold text-xl mb-1">{member.name}</h3>
        <p className="text-blue-400 mb-4">{member.role}</p>
        <p className="text-gray-400 mb-6">{member.bio}</p>
        
        <div className="flex justify-center space-x-4">
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FiGithub size={20} />
          </a>
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <FiTwitter size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileCard