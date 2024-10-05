import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Update</h2>
        <p className="mb-6">Are you sure you want to update this expense?</p>
        <div className="flex justify-end space-x-4">
        <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            onClick={onClose}
          >
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
