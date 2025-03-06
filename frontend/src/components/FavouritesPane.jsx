import React from 'react'
import StockCard from './StockCard'

// TODO: Provide more filter / search options for favourites bar, similar to StockSelector?

const FavouritesPane = (props) => {
    console.log(props.favouriteStocks)
    const favourites = props.favouriteStocks.sort((a, b) => a.security_id - b.security_id);
    console.log(favourites)
    return (
        <div className='flex flex-col bg-darker justify-start w-100 h-[calc(100vh-2rem)] my-4 rounded-lg shadow-lg mx-2'>
            <div className='font-bold text-lg text-white mt-4 mb-2 px-4 py-2'>Favourites</div>
            <div className='flex flex-col justify-center items-center overflow-y-auto'>
                {
                    favourites.map((security, i) => {
                        return(
                        <StockCard key={i} security={security} isActive={props.security == security} handleSecurityChange={props.handleSecurityChange}></StockCard>
                        )
                    })
                }
            </div>
        </div>
            // (favourites != null) && (favourites.length > 0) && stocks.filter((stock) => favourites?.security.includes(stock.security_id)).map((security, i) => {
            // (favourites != null) && (favourites.length > 0) && stocks.filter((stock) => favourites.security.security_id == stock.security_id).map((security, i) => {
    )
}

export default FavouritesPane