import PropTypes from 'prop-types'
import React, { useState, useEffect, componentDidMount } from 'react'


const StockSelecter = props => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
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
    <div>
        <div>StockSelecter</div>
        <div>
            { loading ? (<div>LOADING...</div>) : (
                stocks.map((stock) => (
                    <button
                        key={stock.security_id}
                        className={/*use props.security for conditional formatting of selected item*/''}
                        onClick={()=> props.handleSecurityChange(stock.security_id)}
                    >
                        {stock.security_name}
                    </button>
                ))
            )}
        </div>
    </div>
  )
}

StockSelecter.propTypes = {}

export default StockSelecter