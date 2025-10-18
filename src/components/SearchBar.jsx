import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ onSearch, placeholder = "Search for topics..." }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 bg-zinc-800/50 border border-zinc-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-lg text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 gradient-bg text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </motion.form>
  )
}

export default SearchBar