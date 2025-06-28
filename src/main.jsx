import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RaffleContextProvider } from './context/RaffleContext.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RaffleContextProvider>
       <BrowserRouter>

       <App />
     <ToastContainer theme="dark" position="bottom-right"/>
      
    </BrowserRouter>

    </RaffleContextProvider>
   
   
  </StrictMode>,
)
