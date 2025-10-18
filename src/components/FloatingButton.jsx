import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp, FiTarget } from 'react-icons/fi'

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showGoalPopup, setShowGoalPopup] = useState(false)
  const [dailyGoal, setDailyGoal] = useState('')

  useEffect(() => {
    const savedGoal = localStorage.getItem('learnify_daily_goal')
    if (savedGoal) {
      setDailyGoal(savedGoal)
    }

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSetGoal = () => {
    if (dailyGoal.trim()) {
      localStorage.setItem('learnify_daily_goal', dailyGoal.trim())
      setShowGoalPopup(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-8 right-8 z-40 flex flex-col space-y-4"
          >
            {/* Set Goal Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowGoalPopup(true)}
              className="gradient-bg text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              title="Set Daily Goal"
            >
              <FiTarget size={20} />
            </motion.button>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="gradient-bg text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              title="Back to Top"
            >
              <FiArrowUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goal Popup */}
      {showGoalPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-2xl p-6 max-w-md w-full border border-zinc-600"
          >
            <h3 className="text-white text-xl font-bold mb-4">Set Daily Goal</h3>
            <input
              type="text"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSetGoal}
                className="flex-1 gradient-bg text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                Set Goal
              </button>
              <button
                onClick={() => setShowGoalPopup(false)}
                className="flex-1 bg-zinc-700 text-gray-300 py-3 rounded-xl font-medium hover:bg-zinc-600 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default FloatingButton