import React from 'react'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import CurrentRaffleCard from '../components/CurrentRaffleCard'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <CurrentRaffleCard />
      <FeaturesSection />
      <HowItWorks />
    </div>
  )
}

export default Home