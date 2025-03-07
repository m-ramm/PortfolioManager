import React, {useState, useEffect, useContext} from 'react';
import PortfolioCard from '../components/PortfolioCard';
import TextModal from '../components/TextModal';
import { FaCirclePlus } from "react-icons/fa6";
import { IconContext } from "react-icons";
import AuthContext from '../context/AuthContext';
import PortfolioView from '../components/PortfolioView';

const PortfolioPage = () => {

    const [stocks, setStocks] = useState([])
    const [sectors, setSectors] = useState([])
    const [loading, setLoading] = useState(false)
    const [portfolios, setPortfolios] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [addPortfolioName, setAddPortfolioName] = useState('')
    const [selectedPortfolio, setSelectedPortfolio] = useState(undefined)
    const {user, authTokens} = useContext(AuthContext)

    useEffect(()=>{
        setLoading(true)
        fetchSecurities()
        fetchPortfolios()
        setLoading(false)
    
      }, [])
    
    //   useEffect(()=>{
    //     setLoading(true)
    //     fetchPortfolios()
    //     setLoading(false)
    //   }, [isModalOpen])

    const fetchSecurities = () => {
        fetch("http://127.0.0.1:8000/api/get-securities/")
        .then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setStocks(data)
                let unique = []
                for(let i=0; i<data.length; i++){
                  // console.log(data[i].security_sector)
                  if (!unique.includes(data[i].security_sector)) {
                      unique.push(data[i].security_sector)
                  }
                }
              //   console.log(unique)
                setSectors(unique)
                // setLoading(false)
            }
        )
      }
    
      const fetchPortfolios = () => {
        fetch('http://127.0.0.1:8000/api/get-portfolios/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        }).then(
          response => response.json()
        ).then(
          data => {
            console.log(data)
            setPortfolios(data)
          }
        )
      }
    
      const handleAddPortfolio = () => {
        fetch(`http://127.0.0.1:8000/api/add-portfolio/${addPortfolioName}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        }).then(
          response => {
              response.json()
          }
        ).then(
          data => {
            console.log("adding portfolio: ", data)
          }
        )
        fetchPortfolios()
        setModalOpen(false)
      }

      const handleChangePortfolio = (portfolio) => {
        setSelectedPortfolio(portfolio)
      }
      
    
      return (
        <div className='flex w-full'>
            <div className='flex flex-col bg-darker w-70 rounded-lg mx-2 my-4 p-2'>
                <div className='text-white text-lg font-bold ms-2 my-4'>Portfolio Selector</div>
                <div className='flex flex-col justify-center items-center mx-2 overflow-y-auto'>
                    {portfolios.map((portfolio, index) => { return(<PortfolioCard key={index} portfolio={portfolio} isActive={selectedPortfolio == portfolio} handleChangePortfolio={handleChangePortfolio} />) } )}
                    <IconContext.Provider value={{ size:"40px", className: "transition-colors duration-300 text-grey hover:text-white" }}>
                        <button className='my-4' onClick={() => setModalOpen(true)}><FaCirclePlus /></button>
                    </IconContext.Provider>
                </div>
                <TextModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleAddPortfolio}
                    setNameState={setAddPortfolioName}
                    displayText={"Add Portfolio"}
                />
            </div>
            <PortfolioView portfolio={selectedPortfolio} handleChangePortfolio={handleChangePortfolio}/>
        </div>
      )

}

export default PortfolioPage