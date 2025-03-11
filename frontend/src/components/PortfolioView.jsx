import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from "react-icons/md";
import { IconContext } from 'react-icons';
import ConfirmationModal from '../components/ConfirmationModal';
import TextModal from '../components/TextModal';
import FavouritesPane from './FavouritesPane';

const PortfolioView = (props) => {
    const portfolio = props.portfolio
    const [loading, setLoading] = useState(false)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setEditModalOpen] = useState(false)
    const [editedPortfolioName, setEditedPortfolioName] = useState('')
    const [stocks, setStocks] = useState([])

    useEffect(() => {
        setLoading(true)
        fetchPortfolioSecurities()
        setLoading(false)
    }, [])

    const fetchPortfolioSecurities = () => {
        // fetch portfoliosecurities using portfolio
        if (portfolio != undefined || portfolio != null){
            fetch(`http://127.0.0.1:8000/api/get-portfoliosecurities/${portfolio.portfolio_id}/`, {
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
                console.log(data)
                setStocks(data)
              }
            )
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

    return (
        <div className='flex flex-col grow h-[calc(100vh-2rem)] bg-darker rounded-lg shadow-lg mt-4 mx-2 pt-4 px-2 mb-4'>
            {(portfolio != undefined) ? (
            <div className='flex items-center justify-start mb-2'>
                <div className='text-white font-bold text-lg ms-2 mt-2'>{portfolio.portfolio_name}</div>
                <IconContext.Provider value={{ size:"25px", className: "transition-colors duration-300 text-white hover:text-grey" }}>
                    <button onClick={()=>setEditModalOpen(true)} className='ms-6 mt-2 text-white cursor-pointer'><MdEdit /></button>        
                </IconContext.Provider>
                <IconContext.Provider value={{ size:"25px", className: "transition-colors duration-300 text-white hover:text-red-400" }}>
                    <button onClick={()=>setDeleteModalOpen(true)} className='ms-6 mt-2 text-white cursor-pointer'><MdDelete /></button>        
                </IconContext.Provider>
            </div>
            ) : (
            <div className='flex items-center'>
                <div className='text-white font-bold text-lg ms-2 mt-2'>Portfolio View</div>
            </div>
            )}
            {(portfolio != undefined) ? (
                (loading) ? (<div className='flex grow justify-center items-center'><SyncLoader color='white' /></div>
                ) : (
                    <FavouritesPane favouriteStocks={stocks} security={undefined} handleSecurityChange={null} />
                )
            ) : (
                <div className='flex grow items-center justify-center text-white font-bold'>Please Select a Portfolio</div>
            )}

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