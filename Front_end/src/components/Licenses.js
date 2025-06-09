import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getLicense } from '../services/licenseService';

const Licenses = ({setId}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [licensesPerPage] = useState(10);
  const [licenses, setLicenses] = useState([]);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null); 
  const navigate = useNavigate(); 
  const optionsRef = useRef(null); 

  const indexOfLastLicense = currentPage * licensesPerPage;
  const indexOfFirstLicense = indexOfLastLicense - licensesPerPage;
  const currentLicenses = Array.isArray(licenses) ? licenses.slice(indexOfFirstLicense, indexOfLastLicense) : [];

  const totalLicenses = licenses.length;
  const totalPages = Math.ceil(totalLicenses / licensesPerPage);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await getLicense();
        console.log("result1",response)
        if (Array.isArray(response)) {
          setLicenses(response);
        } else {
          console.error('Unexpected response format:', response);
          setLicenses([]); 
        }
      } catch (error) {
        console.error('Failed to fetch licenses:', error);
        setLicenses([]);      }
    };

    fetchLicenses();
  }, []);

  const handleCreateOrEdit = (license = null) => {
    if (license) {
      navigate(`/license/edit/${license.Order_no}`);
    } else {
      navigate('/license/new');
    }
  };

  const handleDelete = (orderNo) => {
    setLicenses(prevLicenses => prevLicenses.filter(license => license.Order_no !== orderNo));
    setShowOptionsIndex(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleOptions = (index) => {
    setShowOptionsIndex(showOptionsIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptionsIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewLicense = (orderNo) => {
    console.log(orderNo)
    setId(orderNo)
    navigate(`/license/${orderNo}/books`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mt-[-70px] mb-[7px] ml-[10px] font-semibold">Licenses</h2>
      <button 
        onClick={() => handleCreateOrEdit()} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create New
      </button>
      <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">Order No</th>
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">License Name</th>
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">Status</th>
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLicenses.map((license, index) => (
            <tr key={license.Order_no} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-sm text-gray-900">{license.LicenseId}</td>
              <td className="py-2 px-4 border-b text-sm text-gray-900">
                <button 
                  onClick={() => handleViewLicense(license._id)} 
                  className="text-blue-500 hover:underline"
                >
                  {license.LicenseName}
                </button>
              </td>
              <td className="py-2 px-4 border-b text-sm text-gray-900">{license.status}</td>
              <td className="py-2 px-4 border-b text-sm text-gray-900">
                <div className="relative inline-block text-left">
                  <button 
                    onClick={() => handleToggleOptions(index)} 
                    className="focus:outline-none"
                  >
                    •••
                  </button>
                  {showOptionsIndex === index && (
                    <div ref={optionsRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button 
                          onClick={() => handleCreateOrEdit(license)} 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(license.Order_no)} 
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-black px-4 py-2 rounded ml-2 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Licenses;
