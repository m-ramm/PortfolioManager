import React from 'react'
import { Routes, Route } from 'react-router'
import StockPage from './pages/StockPage'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className='flex h-screen bg-dark'>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/securities" element={<StockPage />}></Route>
        <Route path="/portfolios" element={<PortfolioPage />}></Route>
      </Routes>
      
    </div>
  )
}

export default App