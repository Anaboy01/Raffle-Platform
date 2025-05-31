import React from 'react'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import CurrentRaffleCard from '../components/CurrentRaffleCard'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      <HeroSection/>
      <CurrentRaffleCard />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default Home