import React, {useEffect, useState} from 'react'
import Modal from './Modal'

const SelectModal = ({ isOpen, onClose, onConfirm, heading, displayText, options, optionLabels, setSelectState }) => {
    // const [checkboxState, setCheckboxState] = useState(new Array(options.length).fill(false))

    // useEffect(() => {
    //     setSelectState(checkboxState)
    // }, [checkboxState])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg font-bold"> 
            {heading}
            </h2>
        <p className="text-gray-700">
            {displayText}
            </p>
        <div className='flex flex-col grow'>
            { //! need to get this working
                // inputs.map((item, i)=>{
                //     return(
                //         <div className='flex justify-between'>
                //             <label for={i}>{item[i][1]}</label>
                //             <input key={i} id={i} value={item[i][0]} type='checkbox'></input>
                //         </div>
                //     )
                // })
                options.map((option, index) => {
                    return (
                        <div className='flex justify-between' key={index}>
                            <label htmlFor={index}>{optionLabels[index]}</label>
                            <input 
                                key={index} 
                                value={option} 
                                // checked={checkboxState[index]} 
                                type='checkbox'
                                // onChange={setSelectState(oldArr => {
                                //     let newArr = [...oldArr]
                                //     newArr[index] = !newArr[index]
                                //     return newArr
                                // })}
                                onChange={()=>setSelectState(index)}
                            > 
                            </input>
                        </div>
                    ) 
                })
            
                // ()=>{
                //     let output;
                //     for (let i = 0; i<options.length;i++){
                //         output += (
                //         <div className='flex justify-between'>
                //             <label for={i}>{optionLabels[i]}</label>
                //             <input key={i} id={i} value={options[i]} type='checkbox'></input>
                //         </div>)
                        
                //     }
                //     return output
                // }
                
            // options.map((option, index)=>{
            //     return (
            //         <div className='flex justify-between'>
            //             <label for={index}>{optionLabels[index]}</label>
            //             <input key={index} id={index} value={option} type='checkbox'></input>
            //         </div>
            //     )
            // })
            }
            
        </div>
        <div className="flex justify-end
                        space-x-4 mt-4">
            <button
                className="px-4 py-2 bg-gray-500
                            text-white rounded-lg"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                className="px-4 py-2 bg-red-500
                            text-white rounded-lg"
                onClick={onConfirm}
            >
                Confirm
            </button>
        </div>
    </Modal>
  )
}

export default SelectModal