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
  const [searchVal, setSearchVal] = useState('')
  const [filteredStocks, setFilteredStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  useEffect(()=>{
      fetch("http://127.0.0.1:8000/api/get-securities/")
      .then(
          response => response.json()
      ).then(
          data => {
              console.log(data)
              setStocks(data)
              setFilteredStocks(data)
              setLoading(false)
          }
      )
  }, [])

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchVal(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = stocks.filter((stock) =>
        stock.security_ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.security_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredStocks(filteredItems);
  }

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
            {!isCollapsed && (
                <div className='flex justify-center items-center mt-2 mb-4'>
                        <input className={`bg-dark text-white font-bold p-2`} type="text" value={searchVal} onChange={handleInputChange} placeholder='Search...' />
                </div>
            )}
            <div className='flex flex-col overflow-y-auto overflow-x-hidden h-[calc(100vh-9rem)]'>
                { loading ? (<div className='flex justify-center items-center mt-8'><SyncLoader color='white' /></div>) : (
                    
                    (filteredStocks.length) !== 0 ? (
                        filteredStocks.map((stock) => {
                            const isActive = stock === props.security;
                            return (
                            <button
                                key={stock.security_id}
                                className={/*use props.security for conditional formatting of selected item*/''}
                                onClick={()=> props.handleSecurityChange(stock)}
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
                            </button>)
                            }
                        )
                    ) : (
                        <button>
                            <div className={`flex justify-between px-2 py-3 font-bold transition-colors duration-300 text-grey`}>
                                <div className={`flex items-center me-6 text-lg`}>
                                    None
                                </div>
                                {!isCollapsed && (
                                    <div className={`flex items-center text-xs text-right`}>   
                                        No options found
                                    </div>
                                )}
                            </div>
                        </button>
                    )
                )}
            </div>
        </div>
    </div>
  )
}

StockSelecter.propTypes = {}

export default StockSelecter