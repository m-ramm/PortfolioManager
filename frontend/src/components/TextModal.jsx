import React from "react";
import Modal from "./Modal";

const TextModal = ({ isOpen, onClose, onConfirm, setNameState, displayText }) => {
    const handleNameChange = (e) => {
        setNameState(e.target.value)
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold"> 
                {displayText}
                </h2>
            {/* <p className="text-gray-700">
                Enter portfolio name:
                </p> */}
            <input onChange={handleNameChange} className="border border-grey rounded-lg p-1" type="text" placeholder="Enter Portfolio Name..."></input>    
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
    );
};

export default TextModal