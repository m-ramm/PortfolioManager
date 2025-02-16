import React, { useState, useEffect, componentDidMount } from 'react'
import StockView from '../components/StockView'
import StockSelecter from '../components/StockSelecter'

const StockPage = () => {
    const [selectedSecurity, setSelectedSecurity] = useState(undefined)

    const handleSecurityChange = (security_id) => {
        setSelectedSecurity(security_id)
    }

  return (
    <div>
      <div className='flex h-screen'>
          <StockSelecter security={selectedSecurity} handleSecurityChange={handleSecurityChange}/>
          <StockView security={selectedSecurity}/>
      </div>
    </div>
  )
}

export default StockPage