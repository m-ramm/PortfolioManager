import React from 'react'
import PropTypes from 'prop-types'
import Chart from "react-apexcharts"
import ApexChart from 'apexcharts'

// TODO scale the distance between x-axis ticks depending on the range of the dates chosen
const CandleStick = props => {

    const options = {
        chart: {
          type: 'candlestick',
        },
        title: {
          text: '',
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
      <div id="chart" className="w-full max-h-[calc(100vh-20rem)]">
          <Chart options={options} series={props.series} type="candlestick" />
      </div>
  )
}

CandleStick.propTypes = {}

export default CandleStick