import React from "react";
import Modal from "./Modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold"> 
                Confirm Logout
                </h2>
            <p className="text-gray-700">
                Are you sure you want to logout?
                </p>
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

export default ConfirmationModal
