import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          Confirm Delete
        </h2>

        <p id="modal-description" className="mb-6">
          Are you sure you want to delete this expense?
        </p>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primarylight"
            onClick={onConfirm}
            aria-label="Confirm deletion"
          >
            Confirm
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            onClick={onClose}
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
