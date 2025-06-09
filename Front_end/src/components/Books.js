import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLicenseDetails } from "../services/licenseService"; // Adjust the path as needed

const Books = (id) => {
  const { orderNo } = useParams();
  const [books, setBooks] = useState([]); // Initialize state for books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getLicenseDetails(id);
        // Fetch license details using orderNo
        console.log("logger", response);
        if (response) {
          setBooks(response); // Update books state
        } else {
          setBooks([]); // Handle unexpected response format
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setError("Failed to load books."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBooks();
  }, [orderNo]);

  if (loading) {
    return <div className="p-6">Loading...</div>; // Loading message
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>; // Error message
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-semibold">
        ENTITLEMENTS
      </h2>
      <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">
              Book ID
            </th>
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">
              Title
            </th>
            {/* <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">Author</th> */}
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">
              Concurrency
            </th>
            <th className="py-3 px-4 border-b text-left text-sm font-large text-gray-700">
              Is Premium
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                No books found for this license.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm text-gray-900">
                  {book.Bookid}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-900">
                  {book.BookName}
                </td>
                {/* <td className="py-2 px-4 border-b text-sm text-gray-900">{book.author}</td> */}
                <td className="py-2 px-4 border-b text-sm text-gray-900">
                  {book.Concurrency === 0 ? "NA" : book.Concurrency}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-900">
                  {book.ispremium ? "Yes" : "No"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
