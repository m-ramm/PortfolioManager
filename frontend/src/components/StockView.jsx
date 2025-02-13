import React, { useState, useEffect, componentDidMount } from 'react'
import CandleStick from './CandleStick'

const StockView = (props) => {
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
  fetchDailyPrice(props.security)
 }, [props.security])

  const fetchDailyPrice = (securityId) => {
    if (securityId == undefined) { return }
    setLoading(true)
    //! Update on deployment
    try {
      let url = "http://127.0.0.1:8000/api/get-dailyprices/" + securityId + "/"
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

  return (
    <div>
      <div>StockView</div>
      
      {(props.security != undefined) ? (
        (loading) ? (<div>LOADING...</div>) : (
          <CandleStick series={[
            {
              name: 'Stock Data',
              data: seriesData
            }
          ]} 
          />
        )
      ) : (
          <div>Please Select a Stock</div>
      )}
    </div>
  )
}

export default StockView