import React from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiBookmark, FiPlay } from 'react-icons/fi'

const ResourceCard = ({ resource, type, onBookmark, isBookmarked }) => {
  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onBookmark(resource, type)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700 hover:border-zinc-500 transition-all duration-300 backdrop-blur-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {type === 'video' ? (
            <FiPlay className="text-blue-400" size={20} />
          ) : (
            <FiExternalLink className="text-purple-400" size={20} />
          )}
          <span className="text-sm font-medium text-gray-400 capitalize">
            {type}
          </span>
        </div>
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isBookmarked
              ? 'text-yellow-400 bg-yellow-400/10'
              : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
          }`}
        >
          <FiBookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {resource.thumbnail && (
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
      )}

      <h3 className="text-white font-semibold mb-2 line-clamp-2 text-xl">
        {resource.title}
      </h3>

      {resource.channel && (
        <p className="text-gray-400 text-sl mb-3">{resource.channel}</p>
      )}

      {resource.description && (
        <p className="text-gray-500 text-sl mb-4 line-clamp-2">
          {resource.description}
        </p>
      )}

      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-bg text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2"
      >
        <span>{type === 'video' ? 'Watch' : 'Open'}</span>
        <FiExternalLink size={16} />
      </a>
    </motion.div>
  )
}

export default ResourceCard