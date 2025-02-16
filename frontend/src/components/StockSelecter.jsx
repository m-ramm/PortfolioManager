import PropTypes from 'prop-types'
import React, { useState, useEffect, componentDidMount } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { SyncLoader } from 'react-spinners'

/**
 * TODO:
 * Update fetch link to prod
 * Add ability to select 'Favourites' that are displayed on homepage
 * Search Functionality
 */



const StockSelecter = props => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  useEffect(()=>{
    //! Update on deployment
    fetch("http://127.0.0.1:8000/api/get-securities/")
    .then(
        response => response.json()
    ).then(
        data => {
            console.log(data)
            setStocks(data)
            setLoading(false)
        }
    )
  }, [])

  return (
    <div className={`${!isCollapsed ? ('w-66') : ('w-32')} p-0 mx-2 my-4 max-h-screen transition-all duration-300 ease-in-out`}>
        <div className='flex flex-col bg-darker rounded-lg shadow-lg pt-4 px-2 mb-4'>
                                            
                                                
                                            
            <div className='flex justify-between items-center'>
                {!isCollapsed && (
                    <div className="text-lg font-bold text-white ml-2">Stock Selecter</div>
                )}
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-grey hover:text-white p-2 ml-0 transition-all duration-300 ease-in-out hover:bg-gray-600 rounded-full">
                    {!isCollapsed ? (<FaAngleDoubleLeft size="24px" />) : (<FaAngleDoubleRight size="24px" />) }
                </button>
            </div>
            <div className='flex flex-col overflow-y-auto overflow-x-hidden h-[calc(100vh-5rem)]'>
                { loading ? (<div className='flex justify-center items-center mt-8'><SyncLoader color='white' /></div>) : (
                    stocks.map((stock) => {
                        const isActive = stock.security_id === props.security;
                        return (
                        <button
                            key={stock.security_id}
                            className={/*use props.security for conditional formatting of selected item*/''}
                            onClick={()=> props.handleSecurityChange(stock.security_id, stock.security_name)}
                        >
                            <div className={`flex justify-between px-2 py-3 font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-grey hover:text-white"}`}>
                                <div className={`flex items-center me-6 text-lg`}>
                                    {stock.security_ticker}
                                </div>
                                {!isCollapsed && (
                                    <div className={`flex items-center text-xs text-right`}>   
                                        {stock.security_name}
                                    </div>
                                )}
                            </div>
                        </button>
                    )})
                )}
            </div>
        </div>
    </div>
  )
}

StockSelecter.propTypes = {}

export default StockSelecter