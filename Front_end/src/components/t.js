// src/components/LicenseModal.js
import React, { useState } from 'react';

const LicenseModal = ({ license, onSave, onClose }) => {
  const [formData, setFormData] = useState(license || {});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-1/3">
        <h3 className="text-lg mb-4">{license ? 'Edit License' : 'Create License'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">License Name</label>
            <input
              type="text"
              name="licenseName"
              value={formData.licenseName || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenseModal;
    