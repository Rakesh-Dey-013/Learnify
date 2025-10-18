import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiCode,
  FiCpu, 
  FiDatabase,
  FiCloud,
  FiServer,
  FiYoutube,
  FiBook,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiStar
} from 'react-icons/fi'
import { FaFigma } from "react-icons/fa";
import SearchBar from '../components/SearchBar'
import CategoryBadge from '../components/CategoryBadge'
import ResourceCard from '../components/ResourceCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useBookmarks } from '../hooks/useBookmarks'
import { youtubeAPI, documentationAPI } from '../utils/api'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [videos, setVideos] = useState([])
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)
  const { addBookmark, bookmarks } = useBookmarks()

  const categories = [
    { name: 'Web Development', icon: FiCode, color: 'from-blue-500 to-cyan-500' },
    { name: 'AI/ML', icon: FiCpu, color: 'from-purple-500 to-pink-500' },
    { name: 'Design', icon: FaFigma, color: 'from-green-500 to-teal-500' },
    { name: 'Data Science', icon: FiDatabase, color: 'from-orange-500 to-red-500' },
    { name: 'Cloud', icon: FiCloud, color: 'from-indigo-500 to-blue-500' },
    { name: 'DevOps', icon: FiServer, color: 'from-yellow-500 to-orange-500' }
  ]

  const features = [
    {
      icon: FiTarget,
      title: 'Personalized Learning',
      description: 'AI-powered recommendations tailored to your learning style and goals'
    },
    {
      icon: FiUsers,
      title: 'Expert Curated',
      description: 'Resources hand-picked by industry experts and experienced developers'
    },
    {
      icon: FiTrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and insights'
    },
    {
      icon: FiStar,
      title: 'Quality Content',
      description: 'Access only the highest quality tutorials and documentation'
    }
  ]

  const handleSearch = async (query) => {
    setSearchQuery(query)
    setLoading(true)
    setSelectedCategory('')

    try {
      const [videoResults, docResults] = await Promise.all([
        youtubeAPI.searchVideos(query),
        documentationAPI.searchDocs(query)
      ])

      setVideos(videoResults)
      setDocs(docResults)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category)
    setSearchQuery('')
    setLoading(true)

    try {
      const [videoResults, docResults] = await Promise.all([
        youtubeAPI.searchVideos(category),
        documentationAPI.searchDocs(category)
      ])

      setVideos(videoResults)
      setDocs(docResults)
    } catch (error) {
      console.error('Category search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const isBookmarked = (item, type) => {
    return bookmarks.some(
      bookmark => bookmark.link === item.link && bookmark.type === type
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-indigo-500/20 mb-6">
              <FiStar className="text-yellow-400 mr-2" />
              <span className="text-sm text-gray-300">The Future of Learning is Here</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="gradient-text text-glow">Learnify</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Your <span className="text-white font-semibold">Personalized Learning Dashboard</span> for
            mastering new skills with curated resources
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-gray-300 text-lg mb-8 font-medium">Popular Categories</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <CategoryBadge
                    category={category.name}
                    icon={category.icon}
                    color={category.color}
                    isSelected={selectedCategory === category.name}
                    onClick={handleCategoryClick}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      {(videos.length > 0 || docs.length > 0 || loading) && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-white mb-8"
            >
              Learning Resources
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory && ` in "${selectedCategory}"`}
            </motion.h2>

            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* Videos Section */}
                {videos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <FiYoutube className="text-red-500" size={24} />
                      <h3 className="text-2xl font-bold text-white">Video Tutorials</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videos.map((video, index) => (
                        <ResourceCard
                          key={video.id}
                          resource={video}
                          type="video"
                          onBookmark={addBookmark}
                          isBookmarked={isBookmarked(video, 'video')}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Documentation Section */}
                {docs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <FiBook className="text-blue-500" size={24} />
                      <h3 className="text-2xl font-bold text-white">Documentation</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {docs.map((doc, index) => (
                        <ResourceCard
                          key={doc.id}
                          resource={doc}
                          type="documentation"
                          onBookmark={addBookmark}
                          isBookmarked={isBookmarked(doc, 'documentation')}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>
      )}


      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-violet-400 text-sm font-semibold">
                Why Choose Us
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Learnify
              </span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We combine cutting-edge technology with expert curation to deliver the best learning experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              // Define unique gradient colors for each card
              const gradients = [
                { from: 'from-violet-500', to: 'to-purple-600', icon: 'from-violet-400', iconTo: 'to-purple-500', glow: 'bg-violet-500/20', border: 'border-violet-500/40' },
                { from: 'from-cyan-500', to: 'to-blue-600', icon: 'from-cyan-400', iconTo: 'to-blue-500', glow: 'bg-cyan-500/20', border: 'border-cyan-500/40' },
                { from: 'from-emerald-500', to: 'to-teal-600', icon: 'from-emerald-400', iconTo: 'to-teal-500', glow: 'bg-emerald-500/20', border: 'border-emerald-500/40' },
                { from: 'from-pink-500', to: 'to-rose-600', icon: 'from-pink-400', iconTo: 'to-rose-500', glow: 'bg-pink-500/20', border: 'border-pink-500/40' }
              ]
              const colors = gradients[index % gradients.length]

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Glow Effect on Hover */}
                  <div className={`absolute inset-0 ${colors.glow} rounded-2xl blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>

                  {/* Glass Card */}
                  <div className={`relative h-full bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 group-hover:${colors.border} transition-all duration-500 group-hover:translate-y-[-8px] group-hover:bg-white/10`}>
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/5 ${colors.to}/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className={`relative w-16 h-16 bg-gradient-to-tr ${colors.icon} ${colors.iconTo} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                        <feature.icon className="text-white text-2xl" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="relative text-white font-bold text-xl mb-3 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="relative text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12`}></div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home