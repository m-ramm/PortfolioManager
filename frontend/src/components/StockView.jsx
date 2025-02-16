import React, { useState, useEffect, componentDidMount } from 'react'
import CandleStick from './CandleStick'
import { SyncLoader } from 'react-spinners'

/*
 TODO:
 - find better way of handling startDate and endDate (allow User to adjust?)
 - fix overflow-x-auto of the graph when the sidebars are collapsed
 
 */


const StockView = (props) => {
  const startDate = '2020-01-01'
  const endDate = new Date().toJSON().slice(0, 10);


  const [loading, setLoading] = useState(false)
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
  setLoading(true)
  fetchDailyPrice(props.security)
 }, [props.security])

  const fetchDailyPrice = (securityId) => {
    if (securityId == undefined) { return }
    //! Update on deployment
    try {
      let url = `http://127.0.0.1:8000/api/get-period-dailyprices/${securityId}/${startDate}/${endDate}/`
      fetch(url)
      .then(
        response => response.json()
      ).then(
        data => {
          let output = []
          console.log(data)
          // change the data into correct format for the apex chart, see above. 
          data.forEach(element => {
            output.push({
              x:[
                new Date(element.dp_date)
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

  // fetchDailyPrice(1)

  //! Make it fill to the right.
  return (
    <div className='flex flex-col grow h-[calc(100vh-1.5rem)] bg-darker rounded-lg shadow-lg mt-4 mx-2 pt-4 px-2 mb-4'>
      {(props.security != undefined) ? (<div className='text-white font-bold text-lg ms-2 mt-2'>{props.security_name}</div>) : (
        <div className='text-white font-bold text-lg ms-2 mt-2'>Stock View</div>
      )}
      {(props.security != undefined) ? (
        (loading) ? (<div className='flex grow justify-center items-center'><SyncLoader color='white' /></div>) : (
          <div className='flex grow justify-center overflow-y-auto overflow-x-auto me-6'>
            <CandleStick series={[
              {
                name: 'Stock Data',
                data: seriesData
              }
            ]} 
            />
          </div>
        )
      ) : (
          <div className='flex grow items-center justify-center text-white font-bold'>Please Select a Stock</div>
      )}
    </div>
  )
}

export default StockView