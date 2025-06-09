import React, { useState } from 'react';
import './Modal.css'; // Ensure you have the CSS for styling

const BasicModal = ({ onBulkEdit, bulkConcurrency }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(bulkConcurrency || "");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputValue(bulkConcurrency || ""); // Reset input value when modal closes
  };

  const handleSubmit = () => {
    onBulkEdit(inputValue); // Call the onBulkEdit function from props
    handleClose(); // Close the modal after submission
  };

  return (
    <div>
      <button className='button1' onClick={handleOpen}>Bulk edit</button>
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Container for title and close button */}
            <div className="modal-header">
              <p className='p2'>Set Concurrency</p>
              <button className="btn3" onClick={handleClose}> X </button>
            </div>
            <hr />
            <p className='p1'>Please enter concurrency for all books</p>
            <input 
              className='w-[50px] h-[30px] ml-[30px] border border-gray-300 rounded px-2 text-sm'
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Set concurrency"
            />
            <button className="button2" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicModal;
