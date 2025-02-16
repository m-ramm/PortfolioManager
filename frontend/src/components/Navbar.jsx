import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { IconContext } from 'react-icons'
import { AiOutlineStock } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation(); // Get path

  const staticNavData = [
    { title: "Home", path: "/", icon: <FaHome />, cName: "flex text-light hover-text-magenta" },
    { title: "Securities", path: "/securities", icon: <AiOutlineStock />, cName: "flex text-light hover-text-magenta" },
    { title: "Portfolios", path: "/portfolios", icon: <FaLayerGroup />, cName: "flex text-light hover-text-magenta"  }
  ];

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
                                    {!isCollapsed && <span className="text-lg font-bold text-white ml-2">Finance App</span>}
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
                        </ul>
                    </nav>
                </div>
            </div>
        </IconContext.Provider>

    </div>
  )
}

export default Navbar