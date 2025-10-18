import React from 'react'
import { motion } from 'framer-motion'

const CategoryBadge = ({ category, isSelected, onClick, icon: Icon }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(category)}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
        isSelected
          ? 'gradient-bg text-white shadow-lg'
          : 'bg-zinc-800/50 text-gray-400 hover:text-white hover:bg-zinc-700/50 border border-zinc-600'
      }`}
    >
      {Icon && <Icon size={18} />}
      <span>{category}</span>
    </motion.button>
  )
}

export default CategoryBadge