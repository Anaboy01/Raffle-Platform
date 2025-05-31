import { useState } from "react";
import { Link } from "react-router-dom";


const Navigation = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎲</span>
            <span className="text-xl font-bold text-white">RaffleNFT</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/raffle" className="text-gray-300 hover:text-white transition-colors">
              Raffle
            </Link>
            <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="/winners" className="text-gray-300 hover:text-white transition-colors">
              Winners
            </Link>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/raffle" className="block text-gray-300 hover:text-white transition-colors">
              Raffle
            </Link>
            <Link to="/how-it-works" className="block text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="/winners" className="block text-gray-300 hover:text-white transition-colors">
              Winners
            </Link>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  )

}

export default Navigation