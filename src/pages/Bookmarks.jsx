import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiTrash2, FiExternalLink, FiBookmark, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { useBookmarks } from '../hooks/useBookmarks'

const Bookmarks = () => {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks()

  const BookmarkCard = ({ bookmark }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-effect rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 hover:neon-glow transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {bookmark.type === 'video' ? (
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <FiExternalLink className="text-red-400" size={20} />
            </div>
          ) : (
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FiBookmark className="text-blue-400" size={20} />
            </div>
          )}
          <div>
            <span className="text-sm font-medium text-gray-400 capitalize block">
              {bookmark.type}
            </span>
            <span className="text-xs text-gray-500">{bookmark.site || 'Learnify'}</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => removeBookmark(bookmark.id)}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200"
        >
          <FiTrash2 size={18} />
        </motion.button>
      </div>

      {bookmark.thumbnail && (
        <img
          src={bookmark.thumbnail}
          alt={bookmark.title}
          className="w-full h-32 object-cover rounded-xl mb-4"
        />
      )}

      <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2">
        {bookmark.title}
      </h3>

      {bookmark.channel && (
        <p className="text-gray-400 text-sm mb-3 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          {bookmark.channel}
        </p>
      )}

      {bookmark.description && (
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {bookmark.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={bookmark.link}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-bg text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2"
        >
          <span>{bookmark.type === 'video' ? 'Watch' : 'Open'}</span>
          <FiExternalLink size={16} />
        </motion.a>
        <span className="text-xs text-gray-500">
          {new Date(bookmark.addedAt).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-indigo-500/20 mb-6">
            <FiBookmark className="text-yellow-400 mr-2" />
            <span className="text-sm text-gray-300">Your Saved Resources</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your <span className="gradient-text">Bookmarks</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            All your saved learning resources in one place. Never lose track of valuable content again.
          </p>
        </motion.div>

        {/* Clear All Button */}
        {bookmarks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllBookmarks}
              className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-all duration-200 flex items-center space-x-2"
            >
              <FiAlertCircle size={16} />
              <span>Clear All Bookmarks</span>
            </motion.button>
          </motion.div>
        )}

        {/* Bookmarks Grid */}
        <AnimatePresence>
          {bookmarks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 gradient-bg rounded-full flex items-center justify-center mx-auto mb-8 neon-glow floating">
                <FiBookmark className="text-white" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No bookmarks yet
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Start exploring our curated learning resources and save your favorites for later!
              </p>
              <Link
                to="/"
                className="gradient-bg text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-200 inline-flex items-center space-x-3 neon-glow"
              >
                <span>Explore Resources</span>
                <FiArrowRight size={20} />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        {bookmarks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="glass-effect rounded-2xl p-6 border border-indigo-500/20 inline-flex items-center space-x-6">
              <div>
                <div className="text-2xl font-bold text-white">{bookmarks.length}</div>
                <div className="text-gray-400 text-sm">Total Bookmarks</div>
              </div>
              <div className="w-px h-12 bg-indigo-500/20"></div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {bookmarks.filter(b => b.type === 'video').length}
                </div>
                <div className="text-gray-400 text-sm">Video Tutorials</div>
              </div>
              <div className="w-px h-12 bg-indigo-500/20"></div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {bookmarks.filter(b => b.type === 'documentation').length}
                </div>
                <div className="text-gray-400 text-sm">Documentation</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Bookmarks