import React, { useState, useEffect, componentDidMount } from 'react'
import StockView from '../components/StockView'
import StockSelecter from '../components/StockSelecter'

const StockPage = () => {
    const [selectedSecurity, setSelectedSecurity] = useState(undefined)
    const [selectedSecurityName, setSelectedSecurityName] = useState(undefined)

    const handleSecurityChange = (security_id, security_name) => {
        setSelectedSecurity(security_id)
        setSelectedSecurityName(security_name)
    }

  return (
    <div className='flex flex-row w-full h-screen'>
        <StockSelecter security={selectedSecurity} handleSecurityChange={handleSecurityChange}/>
        <StockView security={selectedSecurity} security_name={selectedSecurityName}/>
    </div>
  )
}

export default StockPage