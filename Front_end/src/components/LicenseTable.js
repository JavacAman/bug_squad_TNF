// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Licenses() {
//   const [licenses, setLicenses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [itemsPerPage] = useState(10);

//   useEffect(() => {
//     // Fetch licenses data from JSON file
//     const fetchLicenses = async () => {
//       try {
//         const response = await axios.get('/data/licenses.json'); // Adjust path if needed
//         const allLicenses = response.data;
//         const totalLicenses = allLicenses.length;
        
//         // Calculate total pages
//         setTotalPages(Math.ceil(totalLicenses / itemsPerPage));
        
//         // Paginate licenses
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         setLicenses(allLicenses.slice(startIndex, endIndex));
//       } catch (error) {
//         console.error('Error fetching licenses:', error);
//       }
//     };

//     fetchLicenses();
//   }, [currentPage, itemsPerPage]);

//   return (
//     <div>
//       <h1>Licenses</h1>
//       {licenses.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Order No</th>
//               <th>License Name</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {licenses.map((license) => (
//               <tr key={license.order_no}>
//                 <td>{license.order_no}</td>
//                 <td>{license.license_name}</td>
//                 <td>{license.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No licenses found.</p>
//       )}
//       <div>
//         {/* Pagination Controls */}
//         <button 
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button 
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Licenses;
