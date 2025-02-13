import React, { useState, useEffect, componentDidMount } from 'react'
import StockView from './StockView'
import StockSelecter from './StockSelecter'

const StockPage = () => {
    const [selectedSecurity, setSelectedSecurity] = useState(undefined)

    const handleSecurityChange = (security_id) => {
        setSelectedSecurity(security_id)
    }

  return (
    <div>
        <div>StockPage</div>
        <StockSelecter security={selectedSecurity} handleSecurityChange={handleSecurityChange}/>
        <StockView security={selectedSecurity}/>
    </div>
  )
}

export default StockPage