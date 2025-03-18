import React, { useContext, useEffect, useState } from 'react'
import { MdDelete, MdEdit } from "react-icons/md";
import { SyncLoader } from 'react-spinners'
import { IconContext } from 'react-icons';
import ConfirmationModal from '../components/ConfirmationModal';
import TextModal from '../components/TextModal';
import FavouritesPane from './FavouritesPane';
import AuthContext from '../context/AuthContext';
import SummaryView from './SummaryView';
import StockView from './StockView';

const PortfolioView = (props) => {
    const portfolio = props.portfolio
    const [loading, setLoading] = useState(false)
    const [summaryViewToggle, setSummaryViewToggle] = useState(false)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setEditModalOpen] = useState(false)
    const [editedPortfolioName, setEditedPortfolioName] = useState('')
    const [stocks, setStocks] = useState([])
    const {authTokens, user} = useContext(AuthContext)
    const [favourites, setFavourites] = useState([])
    const [selectedSecurity, setSelectedSecurity] = useState(undefined)

    useEffect(() => {
      
      const fetchPortfolioSecurities = async () => {
        // fetch portfoliosecurities using portfolio
        if (portfolio != undefined || portfolio != null){
          const response = await fetch(`http://127.0.0.1:8000/api/get-portfoliosecurities/${portfolio.portfolio_id}/`, {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                  }
                })

                const result = await response.json()
                // console.log(result)
                return result
                // .then(
                  //   response => response.json()
                // ).then(
                //   data => {
                  //     console.log(data)
                  //     setStocks(data)
                  //   }
                // )
        }
      }

        const fetchSecurities = async (portfolioSecurities) => {
          // console.log(portfolioSecurities)
          const results = await Promise.all(portfolioSecurities.map(async ({security}) => {
            const response = await fetch(`http://127.0.0.1:8000/api/get-security/${security}/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
              }
            })
              return response.json()
            })
          )
          return results
        }
        
        const fetchAll = async () => {
          setLoading(true)
          const portSecs = await fetchPortfolioSecurities()
          // console.log(portSecs)
          const securities = await fetchSecurities(portSecs)
          setStocks(securities)
          setLoading(false)
        }

        if (portfolio != undefined || portfolio != null){
          fetchAll()
        }
    }, [props.portfolio])

    useEffect(()=>{
      fetchFavourites()
    }, [])

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
            // console.log(data)
            setFavourites(data)
          }
        )
        
      } catch (error) {
        console.log("fetch favourites error: ", error)
      }
    }

    const handleDeletePortfolio = () => {
        //fetch delete
        fetch(`http://127.0.0.1:8000/api/delete-portfolio/${portfolio.portfolio_id}/`, {
            method: 'POST',
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
            setDeleteModalOpen(false)
            props.handleChangePortfolio(undefined)
          }
        )
    }

    const handleEditPortfolio = () => {
        // fetch edit with editedPortfolioName useState
        fetch(`http://127.0.0.1:8000/api/edit-portfolio/${portfolio.portfolio_id}/${editedPortfolioName}/`, {
            method: 'POST',
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
            setEditModalOpen(false)
          }
        )
    }

    const handleSecurityChange = (security) => {
      setSelectedSecurity(security)
    }

    return (
        <div className='flex flex-col grow h-[calc(100vh-2rem)] bg-darker rounded-lg shadow-lg mt-4 mx-2 pt-4 px-2 mb-4'>
            {(portfolio != undefined) ? (
            <div className='flex items-center justify-start mb-2'>
                <div className='text-white font-bold text-lg ms-2 mt-2'>{portfolio.portfolio_name}</div>
                <IconContext.Provider value={{ size:"25px", className: "transition-colors duration-300 text-grey hover:text-white" }}>
                    <button onClick={()=>setEditModalOpen(true)} className='ms-6 mt-2 text-grey cursor-pointer'><MdEdit /></button>        
                </IconContext.Provider>
                <IconContext.Provider value={{ size:"25px", className: "transition-colors duration-300 text-grey hover:text-red-400" }}>
                    <button onClick={()=>setDeleteModalOpen(true)} className='ms-6 mt-2 text-grey cursor-pointer'><MdDelete /></button>        
                </IconContext.Provider>
                <div className='ms-6 flex items-center'>
                  <button onClick={()=>setSummaryViewToggle(true)} className={`ms-6 mt-2 px-2 py-1 rounded-lg shadow-lg cursor-pointer border ${(summaryViewToggle) ? ('text-white font-bold border-white') : ('text-grey border-grey')}`}>Summary</button> 
                  <button onClick={()=>setSummaryViewToggle(false)} className={`ms-3 mt-2 px-2 py-1 rounded-lg shadow-lg cursor-pointer border ${(summaryViewToggle) ? ('text-grey border-grey') : ('text-white font-bold border-white')}`}>Stock</button> 
                </div>
            </div>
            ) : (
            <div className='flex items-center'>
                <div className='text-white font-bold text-lg ms-2 mt-2'>Portfolio View</div>
            </div>
            )}
            {/* <div className='flex grow'> */}
            {(portfolio != undefined) ? (
                (loading) ? (<div className='flex grow justify-center items-center'><SyncLoader color='white' /></div>
                ) : (
                    <FavouritesPane favouriteStocks={stocks} security={selectedSecurity} handleSecurityChange={handleSecurityChange} isPortfolio={true} />
                )
            ) : (
                <div className='flex grow items-center justify-center text-white font-bold'>Please Select a Portfolio</div>
            )}
            {(portfolio != undefined) ? (
                (loading) ? (<div className='flex grow justify-center items-center'><SyncLoader color='white' /></div>
                ) : (
                  (summaryViewToggle) ? (
                    <SummaryView />
                  ):(
                    <StockView security={selectedSecurity} favourites={favourites} />
                  )
                )
            ) : (
                <div className='flex grow items-center justify-center text-white font-bold'>Please Select a Portfolio</div>
            )}
            {/* </div> */}

            <TextModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onConfirm={handleEditPortfolio}
                setNameState={setEditedPortfolioName}
                displayText={`Edit ${portfolio?.portfolio_name}`}
            />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeletePortfolio}
                heading={'Confirm Deletion'}
                displayText={`Are you sure you want to delete ${portfolio?.portfolio_name}?`}
            />
        </div>
    )
}

export default PortfolioView