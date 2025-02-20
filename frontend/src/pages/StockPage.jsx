import React, { useState, useEffect, useContext } from 'react'
import StockView from '../components/StockView'
import StockSelecter from '../components/StockSelecter'
import AuthContext from '../context/AuthContext'


const StockPage = () => {
    const [selectedSecurity, setSelectedSecurity] = useState(undefined)
    const [favourites, setFavourites] = useState([])
    const {user, authTokens} = useContext(AuthContext)

    useEffect(() => {
      fetchFavourites()
    }, [])

    useEffect(() => {
      fetchFavourites()
    }, [selectedSecurity])

    const fetchFavourites = () => {
      try {
        fetch(`http://127.0.0.1:8000/api/get-favourites/`, {
           method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        })
        .then(
          response => response.json()
        ).then(
          data => {
            // console.log(data)
            setFavourites(data)
          }
        )
        
      } catch (error) {
        console.log("fetch favourites error: ", error)
      }
  
    }

    const handleSecurityChange = (security) => {
        setSelectedSecurity(security)
    }

  return (
    <div className='flex flex-row w-full h-screen'>
        <StockSelecter security={selectedSecurity} handleSecurityChange={handleSecurityChange}/>
        <StockView security={selectedSecurity} favourites={favourites}/>
    </div>
  )
}

export default StockPage