import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import StockCard from '../components/StockCard'
import { SyncLoader } from 'react-spinners'
import FavouritesPane from '../components/FavouritesPane'
import StockView from '../components/StockView'

const HomePage = () => {
  const {authTokens, user} = useContext(AuthContext)
  const [portfolios, setPortfolios] = useState([])
  const [favourites, setFavourites] = useState([])
  const [stocks, setStocks] = useState([])
  const [intersectionStocks, setIntersectionStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSecurity, setSelectedSecurity] = useState(undefined)

  useEffect(() => {
    // getPortfolios()
    setLoading(true)
    fetchSecurities()
    fetchFavourites()
  }, [])

  useEffect(() => {
    intersect()
  }, [stocks, favourites])
  
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
          console.log(data)
          setFavourites(data)
        }
      )
      
    } catch (error) {
      console.log("fetch favourites error: ", error)
    }

  }

  const fetchSecurities = () => {
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
  }

  const intersect = () => {
    let output = []
    for (let i=0; i<favourites.length; i++) {
      for (let j=0; j<stocks.length; j++) {
        if (favourites[i].security == stocks[j].security_id ) {
          output.push(stocks[j])
        }
      }
    }
    setIntersectionStocks(output)
  }

  const handleSecurityChange = (security) => {
    setSelectedSecurity(security)
  }


  // const getPortfolios = async () => {
  //   let response = await fetch('https://127.0.0.1:8000/api/get-portfolios/', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + String(authTokens.access)
  //     }
  //   })
  //   let data = await response.json()
  //   if(response.status === 200){
  //     setPortfolios(data)
  //   } else if (response.statusText === 'Unauthorized') {
  //     logoutUser()
  //   }
  // }


  //! below have the full list of stocks and the favourites list which just has security_id. FIX LINE 82
  return (
    <div className='flex w-full'>

      {(loading) ? (<div className='flex justify-center items-center mt-8'><SyncLoader color='white' /></div>
      ) : (
        <>
          {(<FavouritesPane security={selectedSecurity} favouriteStocks={intersectionStocks} handleSecurityChange={handleSecurityChange}/>)}
          <StockView favourites={favourites} security={selectedSecurity}/>
        </>
      )}
      {/* <div>HomePage</div>
      {user && <p>Hello {user.username}</p>} */}
    </div>
  )
}
// .map(.......)

export default HomePage