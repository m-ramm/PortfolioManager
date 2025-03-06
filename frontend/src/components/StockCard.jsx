import React, { useEffect, useState } from 'react'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { SyncLoader } from 'react-spinners';

const StockCard = (props) => {
    const security = props.security
    const [lastDailyPrices, setLastDailyPrices] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)

        //! Dates need to be in yyyy-mm-dd
        let dayAfter = new Date(security.security_last_updated)
        let dayBefore = new Date(dayAfter)
        dayBefore.setDate(dayBefore.getDate() - 1)
        dayAfter = dayAfter.toJSON().slice(0,10)
        dayBefore = dayBefore.toJSON().slice(0,10)
        try {
            // const offset = dayBefore.getTimezoneOffset()
            // let yourBeforeDate = new Date(dayBefore.getTime() - (offset*60*1000))
            // yourBeforeDate.toISOString().split('T')[0]
            // let yourAfterDate = new Date(new Date(security.security_last_updated).getTime() - (offset*60*1000))
            // yourAfterDate.toISOString().split('T')[0]

            fetch(`http://127.0.0.1:8000/api/get-period-dailyprices/${security.security_id}/${dayBefore}/${dayAfter}/`)
            .then(
                response => response.json()
            ).then(
                data => {
                    // console.log(data)
                    setLastDailyPrices(data)
                    setLoading(false)
                }
            )

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [])


    return (
        <>
            {(loading) ? (
                <div className='flex flex-col justify-center items-center bg-darker w-full h-60 p-4 my-4 rounded-lg shadow-lg'>
                    <SyncLoader color='white'/>
                </div>
            ) : (
                <>
                    {(lastDailyPrices == null) ? (
                        <div className='flex flex-col bg-darker w-90 p-4 my-4 rounded-lg shadow-lg border border-dark   '></div>
                    ) : (
                        <div className={`flex flex-col bg-darker w-90 p-4 my-4 rounded-lg shadow-lg transition-colors duration-300 ${props.isActive ? "border border-white" : "border border-dark hover:border-white"}`} onClick={() => props.handleSecurityChange(security)}>

                            <div className='flex justify-between items-center'>
                                <div className='text-white text-lg font-bold me-4'>{security.security_ticker}</div>
                                <div className='text-white text-sm'>{security.security_name}</div>
                            </div>
                            {(lastDailyPrices[1].dp_close >= lastDailyPrices[0].dp_close) ? (
                                <div className='flex justify-between items-center'>
                                    <div className='text-white text-sm font-bold'>{lastDailyPrices[1].dp_close}</div>
                                    <div className='flex items-center justify-between text-green-400 text-xs'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <span className=''>{(lastDailyPrices[1].dp_close - lastDailyPrices[0].dp_close).toFixed(2)}</span>
                                            <span className=''>{`(`}{(((lastDailyPrices[1].dp_close - lastDailyPrices[0].dp_close)/lastDailyPrices[0].dp_close)*100).toFixed(2)}%{`)`}</span>
                                        </div>
                                        <FaCaretUp color='green' size={'40px'}/>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex justify-between items-center'>
                                    <div className='text-white text-sm font-bold'>{lastDailyPrices[1].dp_close}</div>
                                    <div className='flex items-center justify-between text-red-400 text-xs'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <span className=''>{(lastDailyPrices[0].dp_close - lastDailyPrices[1].dp_close).toFixed(2)}</span>
                                            <span className=''>{`(`}{(((lastDailyPrices[0].dp_close - lastDailyPrices[1].dp_close)/lastDailyPrices[0].dp_close)*100).toFixed(2)}%{`)`}</span>
                                        </div>
                                        <FaCaretDown color='red' size={'40px'}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default StockCard