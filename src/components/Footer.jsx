import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          {/* Brand Name */}
          <p className="text-gray-400 text-lg">
            © {currentYear}{' '}
            <span className="font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Learnify
            </span>
            . All rights reserved.
          </p>

          {/* Additional Message */}
          <p className="text-gray-500 text-sl">
            Empowering learners worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer