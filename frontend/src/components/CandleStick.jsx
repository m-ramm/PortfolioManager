import React from 'react'
import PropTypes from 'prop-types'
import Chart from "react-apexcharts"
import ApexChart from 'apexcharts'

const CandleStick = props => {


    const options = {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
    }

  return (
    <div>
        <div>CandleStick</div>
        <div id="chart" className="container">
            <Chart options={options} series={props.series} type="candlestick" height={350} />
        </div>
    </div>
  )
}

CandleStick.propTypes = {}

export default CandleStick