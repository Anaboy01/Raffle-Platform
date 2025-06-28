import React from 'react'
import "./config/connection"
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Raffle from './pages/Raffle'
import Layout from './components/Layout'





const App = () => {
  return (
   
    <Routes>
      <Route path='/' element={<Layout><Home/></Layout> } /> 
      <Route path='/raffle' element={<Layout><Raffle/></Layout> } /> 
    </Routes>
   
  )
}

export default App