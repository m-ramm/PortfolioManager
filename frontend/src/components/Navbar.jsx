import React, { useState, useContext } from 'react'
import ConfirmationModal from './ConfirmationModal';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router'
import { IconContext } from 'react-icons'
import { AiOutlineStock } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { RxHamburgerMenu, RxExit, RxEnter } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";


const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false)
  const location = useLocation(); // Get path
  const navigate = useNavigate(); // Navigation object
  const {user, logoutUser} = useContext(AuthContext)
  let staticNavData;

  if (user) {
    staticNavData = [
        { title: "Home", path: "/", icon: <FaHome />, cName: "flex text-light hover-text-magenta" },
        { title: "Securities", path: "/securities", icon: <AiOutlineStock />, cName: "flex text-light hover-text-magenta" },
        { title: "Portfolios", path: "/portfolios", icon: <FaLayerGroup />, cName: "flex text-light hover-text-magenta"  },
        { title: "About", path: "/about", icon: <IoInformationCircleOutline />, cName: "flex text-light hover-text-magenta"  },
        // { title: "Logout", path: "/logout", icon: <RxExit />, cName:"flex text-light hover-text-magenta" }
    ]
} else {
    staticNavData = [
        { title: "About", path: "/about", icon: <IoInformationCircleOutline />, cName: "flex text-light hover-text-magenta"  },
        {title: "Login", path: "/login", icon: <RxEnter />, cName:"flex text-light hover-text-magenta" }
    ]
  }
  
  const handleLogout = () => {
    setLogoutModalOpen(false)
    logoutUser()
    navigate("/login")
  }

  return (
    <div className='flex flex-col h-screen'>
        <IconContext.Provider value={{ size: "20px" }}>
            <div className={`flex flex-col ${isCollapsed ? 'w-16' : 'w-66'} p-0 mx-2 my-4 h-custom transition-all duration-300 ease-in-out`}>
                <div className="bg-darker rounded-lg shadow-lg pt-4 px-1 mb-4 flex-none">
                    <nav>
                        <div className="px-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {isCollapsed && (
                                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-grey hover:text-white p-2 transition-all duration-300 ease-in-out hover:bg-gray-600 rounded-full">
                                        <RxHamburgerMenu size="24px" />
                                    </button>
                                    )}
                                    {!isCollapsed && <span className="text-lg font-bold text-white ml-2">Portfolio Manager</span>}
                                </div>
                                {!isCollapsed && (
                                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-grey hover:text-white p-2 ml-0 transition-all duration-300 ease-in-out hover:bg-gray-600 rounded-full">
                                    <FaAngleDoubleLeft size="24px" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <ul className="flex flex-col w-full">
                            {staticNavData.map((item, index) => {
                                const isActive = location.pathname === item.path; // Check if active
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center space-x-5 ml-0.5 w-full px-4 py-2 mb-2 font-bold text-lg transition-colors duration-300 ${
                                            isActive ? "text-white" : "text-grey hover:text-white"
                                            }`}
                                        >
                                            {item.icon}
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </Link>
                                    </li>
                                );
                            })}
                            {user && (
                                <li key="logout" className="flex text-light hover-text-magenta">
                                    <button 
                                        className={`flex items-center space-x-5 ml-0.5 w-full px-4 py-2 mb-2 font-bold text-lg transition-colors duration-300 text-grey hover:text-white cursor-pointer text-grey"
                                        }`}
                                        onClick={()=>setLogoutModalOpen(true)}
                                    >
                                        <RxExit />
                                        {!isCollapsed && <span>Logout</span>}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </IconContext.Provider>
        <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
        />
    </div>
  )
}

export default Navbar