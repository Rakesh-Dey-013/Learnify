import React from 'react'
import { motion } from 'framer-motion'
import ProfileCard from '../components/ProfileCard'

const About = () => {
  const teamMembers = [
    {
      name: "Rakesh Kr. Dey",
      role: "MERN Stack Developer",
      bio: "Passionate about creating educational technology that makes learning accessible to everyone. Loves React, Node.js, and open source.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGeYtGQAn3PwA/profile-displayphoto-scale_200_200/B4DZnEizlPG8AY-/0/1759939085976?e=1762387200&v=beta&t=fr4eOjFyitnNnAANbnEWA8G-8vIAmVCSpbYWD3BXD-o",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Debasis Ruidas",
      role: "MERN Stack Developer",
      bio: "Designer with a focus on creating intuitive and beautiful user experiences. Believes good design should be both functional and delightful.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFHiZtI03JXCg/profile-displayphoto-crop_800_800/B4EZh6jD1cGUAI-/0/1754402669865?e=1762387200&v=beta&t=dsrOfz-EFDzRVbDaVrdj7t8kMm8wDh0JOokahDXzAYg",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">Learnify</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Learnify is a modern learning platform that brings together the best educational resources 
            from across the web, powered by AI to personalize your learning journey.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700 text-center">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">🎯</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Personalized Learning</h3>
            <p className="text-gray-400">
              AI-powered recommendations tailored to your learning style and goals
            </p>
          </div>

          <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700 text-center">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Curated Resources</h3>
            <p className="text-gray-400">
              Hand-picked videos, documentation, and tutorials from trusted sources
            </p>
          </div>

          <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700 text-center">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">🚀</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              Set goals, track your progress, and celebrate your learning milestones
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <ProfileCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 text-lg">
              We believe that everyone should have access to quality education. Learnify is our 
              contribution to making learning more accessible, engaging, and effective through 
              technology and thoughtful design.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About