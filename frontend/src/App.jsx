import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router'
import StockPage from './pages/StockPage'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'
import Navbar from './components/Navbar'
import AuthContext from './context/AuthContext'


const App = () => {
  let user = useContext(AuthContext)
  return (
    <div className='flex h-screen bg-dark overflow-x-auto'>
      {//if this.location is LoginPage, then do not render NavBar 
      }
      <Navbar />
        <Routes>
            <Route path="/login" element={<LoginPage />} ></Route>
            <Route path="/" element={ user ? (<HomePage />) : (<Navigate replace to="/login" />)}></Route>
            <Route path="/securities" element={ user ? (<StockPage />) : (<Navigate replace to="/login" />)}></Route>
            <Route path="/portfolios" element={ user ? (<PortfolioPage />) : (<Navigate replace to="/login" />)}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
        </Routes>
      
    </div>
  )
}

export default App