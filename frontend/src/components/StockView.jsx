import React, { useState, useEffect, useContext } from 'react'
import CandleStick from './CandleStick'
import { SyncLoader } from 'react-spinners'
import AuthContext from '../context/AuthContext'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import SelectModal from './SelectModal';


/*
 TODO:
 - find better way of handling startDate and endDate (allow User to adjust?)
 - fix overflow-x-auto of the graph when the sidebars are collapsed
 
 */


const StockView = (props) => {
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));

  const {user, authTokens} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [isSelectModalOpen, setSelectModalOpen] = useState(false)
  const [portfolios, setPortfolios] = useState([])
  const [validPortfolios, setValidPortfolios] = useState([])
  const [addCheckboxState, setAddCheckboxState] = useState([])
  const [isFavourite, setFavourite] = useState(false)
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

  //! function is broken
  const filterValidPortfolios = (portfolios, existingPortfolioSecurities) => {
    console.log(portfolios)
    let output = []
    let flag = false
    for (let i=0;i<existingPortfolioSecurities.length;i++){
      for (let j=0; j<existingPortfolioSecurities[i].length;j++){
        if (existingPortfolioSecurities[i][j].security_id == props.security_id && existingPortfolioSecurities[i][j].portfolio_id == portfolios[i].portfolio_id){
          flag = true;
          break;
        }
      }
      if (!flag) { 
        output.push(portfolios[i])
      }
      flag = false
    }
  
    return output
  }

 useEffect(()=> {
  if (props.security != undefined){
    checkFavourite(user, props.security, props.favourites)
    setLoading(true)
    fetchDailyPrice(props.security)
    // fetchPortfolios()
  }
 }, [props.security])

 useEffect(()=>{
  const fetchPortfolios = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/get-portfolios/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    const json = await response.json()

    return json
    // .then(
    //   response => response.json()
    // ).then(
    //   data => {
    //     return data
    //   }
    // )  
  }

  // const fetchPortfolioSecurities = async (portfoliosList) => {
  //   const promises = portfoliosList.map((portfolio) => 
  //     fetch(`http://127.0.0.1:8000/api/get-portfoliosecurities/${portfolio.portfolio_id}/`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + String(authTokens.access)
  //       }
  //     }).then(
  //       response => response.json()
  //     )
  //   )
  //   // Promise.all(promises).then((results) => {
  //   //   console.log(results)
  //   //   let valids = filterValidPortfolios(results)
  //   //   return valids
  //   // })
  //   const promiseAll = await Promise.all(promises)
  //   console.log(promiseAll)
  //   let valids = filterValidPortfolios(promiseAll)
  //   return valids

  const fetchPortfolioSecurities = async (portfoliosList) => {
    const results = await Promise.all(
      portfoliosList.map(async (portfolio) => {
          const response = await fetch(`http://127.0.0.1:8000/api/get-portfoliosecurities/${portfolio.portfolio_id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
          });
          // console.log(response)
          return response.json();
          // console.log(response.json())
      })
    );
    // console.log(results)
    return results
  }

  // const fetchPortfolioSecurities = async (portfoliosList) => {
  //   try {
  //       const responses = await Promise.all(
  //           portfoliosList.map(async (portfolio) => {
  //               const response = await fetch(
  //                   `http://127.0.0.1:8000/api/get-portfoliosecurities/${portfolio.portfolio_id}/`,
  //                   {
  //                       method: 'GET',
  //                       headers: {
  //                           'Content-Type': 'application/json',
  //                           'Authorization': 'Bearer ' + String(authTokens.access)
  //                       }
  //                   }
  //               );
  //               console.log(await   response.json())
  //               // return response.json();
  //           })
  //       );

  //       console.log(responses);
  //       return filterValidPortfolios(responses);
  //   } catch (error) {
  //       console.error("Error fetching portfolio securities:", error);
  //       return [];
  //   }
  // };

  const fetchAll = async () => {
    let tempPortfolios = await fetchPortfolios()
    console.log(tempPortfolios)
    setPortfolios(tempPortfolios)
    setAddCheckboxState(new Array(tempPortfolios.length).fill(false))
    let portfolioSecurities = await fetchPortfolioSecurities(tempPortfolios)
    let valids = filterValidPortfolios(tempPortfolios, portfolioSecurities)
    console.log(valids)
    setValidPortfolios(valids)
  }
  //     .then(
  //       data2 => {
  //         // console.log(data2)
  //         let flag = false
  //         for (let j=0; j<data2.length; j++){
  //           if (data2[j].security_id == props.security.security_id ) {
  //             flag = true
  //           }
  //         }
  //         if(!flag){
  //           console.log(data[i])
  //           // setValidPortfolios(validPortfolios.push(data[i]))
  //           options.push(data[i].portfolio_id)
  //           optionLabels.push(data[i].portfolio_name)
  //         }
  //       }
  //     )
  //   }
  // }
    if(props.security != undefined) {
      fetchAll()
    }
 },[props.security])


  const checkFavourite = (user, security, favouritesList) => {
    for (let i=0;i<favouritesList.length;i++){
      if (favouritesList[i].user == user.user_id && favouritesList[i].security == security.security_id){
        console.log('here')
        setFavourite(true)
        return;
      } 
    }
    setFavourite(false)
    return;
  }

  const fetchDailyPrice = (security) => {
    if (security == undefined) { return }
    //! Update on deployment
    try {
      let url = `http://127.0.0.1:8000/api/get-period-dailyprices/${security.security_id}/${startDate}/${endDate}/`
      fetch(url)
      .then(
        response => response.json()
      ).then(
        data => {
          let output = []
          // console.log(data)
          // change the data into correct format for the apex chart, see above. 
          data.forEach(element => {
            output.push({
              x:[
                new Date(element.dp_date).toJSON().slice(0,10)
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


  const changeFavourite = (security) => {
    fetch(`http://127.0.0.1:8000/api/set-favourite/${security.security_id}/`, {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
      // body: JSON.stringify({
      //   user: user,
      //   security: security
      // })
    }).then(
      response => {
        try {
          response.json()
        } catch (error) {
          console.log(error)
        }
      }
    ).then(
      data => {
        console.log("adding favourite: ", data)
      }
    )
  }

  const handleFavourite = () => {
    try {
      changeFavourite(props.security)
    } catch (error) {
      console.log(error)
      return;
    }
    setFavourite(!isFavourite)
  }

  const handleStartDate = (e) => {
    // console.log(e.target.value)
    setStartDate(e.target.value)
  }
  const handleEndDate = (e) => {
    // console.log(e.target.value)
    setEndDate(e.target.value)
  }
  const handleApplyFilters = () => {
    setLoading(true)
    fetchDailyPrice(props.security)
  }
  const handleSelectPortfolioStock = (indexChanged) => {
    setAddCheckboxState(oldArr => {
      let newArr = [...oldArr]
      newArr[indexChanged] = !newArr[indexChanged]
      return newArr
    })
  }
  const handleConfirmPortfolioStock = () => {
    //! fetch add to all selected checkboxes
    //fetch with portfolios[addCheckboxState]
    addPortfolioSecurity()
    setSelectModalOpen(false)
  }

  const addPortfolioSecurity = () => {
    let filteredPortfolios = []
    for (let i = 0;i<portfolios.length;i++){
      if (addCheckboxState[i] == true){
        filteredPortfolios.push(portfolios[i])
      }
    }
    const promises = filteredPortfolios.map((portfolio)=>{
      fetch(`http://127.0.0.1:8000/api/set-portfoliosecurity/${portfolio?.portfolio_id}/${props.security?.security_id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      .then(
        response => response.json()
      )
    })

    Promise.all(promises).then((results)=>{
      console.log(results)
    })
  }

  return (
    <div className='flex flex-col grow h-[calc(100vh-1.5rem)] bg-darker rounded-lg shadow-lg mt-4 mx-2 pt-4 px-2 mb-4'>
      {(props.security != undefined) ? (
        <div className='flex items-center justify-start mb-2'>
          <div className='text-white font-bold text-lg ms-2 mt-2'>{props.security.security_name}</div>
          { 
          //(loading) ? (<div className=''><SyncLoader color='white' /></div>
          //) : ( 
            (isFavourite) ? (<button onClick={()=>handleFavourite()} className='ms-6 mt-2 text-white cursor-pointer'><MdFavorite size={'25px'}/></button>
            ) : (
              <button onClick={()=>handleFavourite()} className='ms-6 mt-2 text-white cursor-pointer'><MdFavoriteBorder size={'25px'}/></button>
            )
          //)
          }
          <button onClick={setSelectModalOpen} className='ms-6 mt-2 text-white cursor-pointer'><FaCirclePlus size={'25px'}/></button>
        </div>
      ) : (
        <div className='flex items-center'>
          <div className='text-white font-bold text-lg ms-2 mt-2'>Stock View</div>
        </div>
      )}
      {(props.security != undefined) ? (
        (loading) ? (<div className='flex grow justify-center items-center'><SyncLoader color='white' /></div>
        ) : (
          <div className='flex flex-col grow me-6'>
            <div className='flex items-center w-full mx-2 mt-2 mb-4'>
              <div className='flex grow items-center'>
                {/* <label htmlFor='startDate' className='text-grey'>From</label> */}
                <input id='startDate' onChange={handleStartDate} className='text-grey p-1 rounded-lg shadow-lg border border-grey' type="date" value={startDate} />
                <label htmlFor='endDate' className='text-grey ms-4'>To</label>
                <input id='endDate' onChange={handleEndDate} className='text-grey ms-4 p-1 rounded-lg shadow-lg border border-grey' type="date" value={endDate} />
              </div>
              <div className='ms-8'>
                <button onClick={() => handleApplyFilters()} className='bg-dark text-grey font-bold py-1 px-3 rounded-lg shadow-lg border border-grey'>Apply</button>
              </div>
            </div>
            <div className='flex overflow-y-auto overflow-x-auto w-full'>
              <CandleStick series={[
                {
                  name: 'Stock Data',
                  data: seriesData
                }
              ]} 
              />
            </div>
          </div>
        )
      ) : (
          <div className='flex grow items-center justify-center text-white font-bold'>Please Select a Stock</div>
      )}
      {//! add options and optionLabels, will need to fetch for the available portfolios
      //! make sure that only options presented are portfolios where stock is not already in.
      }
        <SelectModal
            isOpen={isSelectModalOpen}
            onClose={() => setSelectModalOpen(false)}
            onConfirm={handleConfirmPortfolioStock}
            heading={`Add ${props.security?.security_name} to:`}
            displayText={//`Which portfolio would you like to add '${props.security?.security_name}' to?`
              ''}
            options={validPortfolios.map(({portfolio_id})=>portfolio_id)}
            optionLabels={validPortfolios.map(({portfolio_name})=>portfolio_name)}
            setSelectState={handleSelectPortfolioStock}
        />
      
      
    </div>
  )
}

export default StockView