import React from 'react'
import { motion } from 'framer-motion'

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700"
        >
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-zinc-600 rounded"></div>
                <div className="w-20 h-4 bg-zinc-600 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-zinc-600 rounded-lg"></div>
            </div>
            <div className="w-full h-40 bg-zinc-600 rounded-xl mb-4"></div>
            <div className="w-3/4 h-5 bg-zinc-600 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-zinc-600 rounded mb-3"></div>
            <div className="w-full h-3 bg-zinc-600 rounded mb-2"></div>
            <div className="w-2/3 h-3 bg-zinc-600 rounded mb-4"></div>
            <div className="w-24 h-10 bg-zinc-600 rounded-lg"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default LoadingSkeleton