import React, { useState, useEffect, useContext } from 'react'
import CandleStick from './CandleStick'
import { SyncLoader } from 'react-spinners'
import AuthContext from '../context/AuthContext'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";


/*
 TODO:
 - find better way of handling startDate and endDate (allow User to adjust?)
 - fix overflow-x-auto of the graph when the sidebars are collapsed
 
 */


const StockView = (props) => {
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));

  const {user, authTokens} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [isFavourite, setFavourite] = useState(false)
  const [seriesData, setSeriesData] = useState([{
    x: new Date(1538879400000),
    y: [6604.44, 6604.44, 6600, 6603.5]
  },
  {
    x: new Date(1538881200000),
    y: [6603.5, 6603.99, 6597.5, 6603.86]
  },
  {
    x: new Date(1538883000000),
    y: [6603.85, 6605, 6600, 6604.07]
  },
  {
    x: new Date(1538884800000),
    y: [6604.98, 6606, 6604.07, 6606]
  }])

 useEffect(()=> {
  if (props.security != undefined){
    checkFavourite(user, props.security, props.favourites)
    setLoading(true)
    fetchDailyPrice(props.security)
  }
 }, [props.security])

  const checkFavourite = (user, security, favouritesList) => {
    for (let i=0;i<favouritesList.length;i++){
      if (favouritesList[i].user == user.user_id && favouritesList[i].security == security.security_id){
        console.log('here')
        setFavourite(true)
        return;
      } 
    }
    setFavourite(false)
    return;
  }

  const fetchDailyPrice = (security) => {
    if (security == undefined) { return }
    //! Update on deployment
    try {
      let url = `http://127.0.0.1:8000/api/get-period-dailyprices/${security.security_id}/${startDate}/${endDate}/`
      fetch(url)
      .then(
        response => response.json()
      ).then(
        data => {
          let output = []
          // console.log(data)
          // change the data into correct format for the apex chart, see above. 
          data.forEach(element => {
            output.push({
              x:[
                new Date(element.dp_date).toJSON().slice(0,10)
              ],
              y: [
                element.dp_open,
                element.dp_high,
                element.dp_low,
                element.dp_close
              ]
            })
          });
          setSeriesData(output)
          setLoading(false)
        }
      )
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const changeFavourite = (security) => {
    fetch(`http://127.0.0.1:8000/api/set-favourite/${security.security_id}/`, {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
      // body: JSON.stringify({
      //   user: user,
      //   security: security
      // })
    }).then(
      response => {
        try {
          response.json()
        } catch (error) {
          console.log(error)
        }
      }
    ).then(
      data => {
        console.log("adding favourite: ", data)
      }
    )
  }

  const handleFavourite = () => {
    try {
      changeFavourite(props.security)
    } catch (error) {
      console.log(error)
      return;
    }
    setFavourite(!isFavourite)
  }

  const handleStartDate = (e) => {
    // console.log(e.target.value)
    setStartDate(e.target.value)
  }
  const handleEndDate = (e) => {
    // console.log(e.target.value)
    setEndDate(e.target.value)
  }
  const handleApplyFilters = () => {
    setLoading(true)
    fetchDailyPrice(props.security)
  }


  //! Make it fill to the right.
  return (
    <div className='flex flex-col grow h-[calc(100vh-1.5rem)] bg-darker rounded-lg shadow-lg mt-4 mx-2 pt-4 px-2 mb-4'>
      {(props.security != undefined) ? (
        <div className='flex items-center justify-start mb-2'>
          <div className='text-white font-bold text-lg ms-2 mt-2'>{props.security.security_name}</div>
          { 
          //(loading) ? (<div className=''><SyncLoader color='white' /></div>
          //) : ( 
            (isFavourite) ? (<button onClick={()=>handleFavourite()} className='ms-6 mt-2 text-white cursor-pointer'><MdFavorite size={'25px'}/></button>
            ) : (
              <button onClick={()=>handleFavourite()} className='ms-6 mt-2 text-white cursor-pointer'><MdFavoriteBorder size={'25px'}/></button>
            )
          //)
          }
        </div>
      ) : (
        <div className='flex items-center'>
          <div className='text-white font-bold text-lg ms-2 mt-2'>Stock View</div>
        </div>
      )}
      {(props.security != undefined) ? (
        (loading) ? (<div className='flex grow justify-center items-center'><SyncLoader color='white' /></div>
        ) : (
          <div className='flex flex-col grow me-6'>
            <div className='flex items-center w-full mx-2 mt-2 mb-4'>
              <div className='flex grow items-center'>
                {/* <label htmlFor='startDate' className='text-grey'>From</label> */}
                <input id='startDate' onChange={handleStartDate} className='text-grey p-1 rounded-lg shadow-lg border border-grey' type="date" value={startDate} />
                <label htmlFor='endDate' className='text-grey ms-4'>To</label>
                <input id='endDate' onChange={handleEndDate} className='text-grey ms-4 p-1 rounded-lg shadow-lg border border-grey' type="date" value={endDate} />
              </div>
              <div className='ms-8'>
                <button onClick={() => handleApplyFilters()} className='bg-dark text-grey font-bold py-1 px-3 rounded-lg shadow-lg border border-grey'>Apply</button>
              </div>
            </div>
            <div className='flex overflow-y-auto overflow-x-auto w-full'>
              <CandleStick series={[
                {
                  name: 'Stock Data',
                  data: seriesData
                }
              ]} 
              />
            </div>
          </div>
        )
      ) : (
          <div className='flex grow items-center justify-center text-white font-bold'>Please Select a Stock</div>
      )}
    </div>
  )
}

export default StockView