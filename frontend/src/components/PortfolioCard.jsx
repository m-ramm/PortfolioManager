import React from 'react'

const PortfolioCard = (props) => {
    const portfolio = props.portfolio
    return (
        <div onClick={()=>props.handleChangePortfolio(portfolio)} className={`flex justify-start items-center bg-darker w-60 p-4 my-4 rounded-lg shadow-lg transition-colors duration-300 ${props.isActive ? ("border border-white") : ("border border-dark hover:border-white")}`}>
            <div className='text-white font-bold'>{portfolio.portfolio_name}</div>
        </div>
    )
}

export default PortfolioCard