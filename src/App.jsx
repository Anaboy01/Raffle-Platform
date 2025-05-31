import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Raffle from './pages/Raffle'



const App = () => {
  return (
   
    <Routes>
      <Route path='/' element={<Home/>} /> 
      <Route path='/raffle' element={<Raffle/>} /> 
    </Routes>
   
  )
}

export default App