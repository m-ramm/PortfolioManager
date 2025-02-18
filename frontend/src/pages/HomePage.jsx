import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  const {authTokens, user, logoutUser} = useContext(AuthContext)
  const [portfolios, setPortfolios] = useState([])

  useEffect(()=> {
    // getPortfolios()
  }, [])

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

  return (
    <div>
      <div>HomePage</div>
      {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default HomePage