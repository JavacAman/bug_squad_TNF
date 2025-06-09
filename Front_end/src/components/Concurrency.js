import React, { useState, useEffect } from "react";

import "./Concurrency.css";

import BasicModal from "./Modal";

import { useNavigate } from "react-router-dom";

const Concurrency = ({ bundles, bulkConcurrency, setBulkConcurrency, concurrency, setConcurrency }) => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [savedConcurrency, setSavedConcurrency] = useState({});

  const [errors, setErrors] = useState({}); // Error state to track invalid inputs

  const premiumBooks = bundles.filter((bundle) => bundle.ispremium);

  useEffect(() => {

    const initialData = bundles.map(book => ({

      ...book,

      Concurrency: concurrency[book.Bookid] || bulkConcurrency || 0,

    }));

    setData(initialData);

  }, [bundles, bulkConcurrency, concurrency]);

  const handleConcurrencyChange = (index, value) => {

    const updatedData = [...data];

    const bookId = updatedData[index].Bookid;

    // Validate input for non-numeric, negative values, or empty input

    if (value === "") {

      // Set error message if the input is empty

      setErrors((prev) => ({

        ...prev,

        [bookId]: "Please enter a valid concurrency (non-negative number)",

      }));

      updatedData[index].Concurrency = ""; // Allow empty input

      setData(updatedData);

      setSavedConcurrency((prev) => ({

        ...prev,

        [bookId]: "", // Update savedConcurrency to empty

      }));

      return;

    }

    // Check if the input is a valid number

    const intValue = parseInt(value, 10);

    if (isNaN(intValue) || intValue < 0) {

      // Set error message for invalid values

      setErrors((prev) => ({

        ...prev,

        [bookId]: "Please enter a valid concurrency (non-negative number)",

      }));

      updatedData[index].Concurrency = value; // Update with invalid input

      setData(updatedData);

      return;

    }

    // Clear any existing error for this input

    setErrors((prev) => ({

      ...prev,

      [bookId]: "",

    }));

    // Update the input value if it's valid

    updatedData[index].Concurrency = intValue;

    setData(updatedData);

    setSavedConcurrency((prev) => ({

      ...prev,

      [bookId]: intValue,

    }));

    setConcurrency((prev) => ({

      ...prev,

      [bookId]: intValue,

    }));

  };

  const handleBulkEdit = (value) => {

    const intValue = parseInt(value, 10);

    if (intValue < 0) {

      setErrors({ global: "Please enter a valid bulk concurrency (non-negative number)" });

      return;

    }

    const updatedData = data.map((row) => ({

      ...row,

      Concurrency: intValue,

    }));

    setData(updatedData);

    setBulkConcurrency(intValue);

    setConcurrency({});

    setErrors({}); 

    const newSavedConcurrency = {};

    updatedData.forEach(row => {

      newSavedConcurrency[row.Bookid] = intValue;

    });

    setSavedConcurrency(newSavedConcurrency);

  };

  const handleSave = () => {

    let hasError = false;

    const updatedErrors = {};

    premiumBooks.forEach((row, index) => {

      const concurrencyValue = savedConcurrency[row.Bookid] || data[index]?.Concurrency;

      if (concurrencyValue === "" || concurrencyValue === 0 || concurrencyValue < 0 || isNaN(concurrencyValue)) {

        updatedErrors[row.Bookid] = "Please enter a valid concurrency (non-negative number)";

        hasError = true;

      }

    });

    if (hasError) {

      setErrors(updatedErrors);

      alert("Please correct the errors before saving.");

      return;

    }

    console.log("Saving data", data);

    console.log("Concurrency data:", savedConcurrency);

    console.log("Bulk Concurrency data:", bulkConcurrency);

    navigate(-1);

  };

  // Determine if the save button should be disabled

  const isSaveDisabled = premiumBooks.some((row, index) => {

    const concurrencyValue = savedConcurrency[row.Bookid] || data[index]?.Concurrency;

    return concurrencyValue === "" || concurrencyValue === 0 || concurrencyValue < 0 || isNaN(concurrencyValue);

  });

  return (
<div className="container">
<h1>View or Edit DRM Policies</h1>
<div className="bulk-edit">
<BasicModal onBulkEdit={handleBulkEdit} bulkConcurrency={bulkConcurrency} />

        {errors.global && <div className="error-message">{errors.global}</div>}
</div>
<table className="data-table">
<thead>
<tr>
<th>Book Title</th>
<th>ISBN</th>
<th>Published Status</th>
<th>Concurrency</th>
</tr>
</thead>
<tbody>

          {premiumBooks.map((row, index) => (
<tr key={row.Bookid}>
<td>{row.BookName}</td>
<td>{row.ISBN || "N/A"}</td>
<td>{row.publishedStatus || "Published"}</td>
<td>
<input

                  type="number"

                  className={`concurrency-input ${errors[row.Bookid] ? 'error' : ''}`}

                  value={savedConcurrency[row.Bookid] !== undefined ? savedConcurrency[row.Bookid] : data[index]?.Concurrency || ""}

                  onChange={(e) => handleConcurrencyChange(index, e.target.value)}

                  placeholder="Enter concurrency"

                />

                {errors[row.Bookid] && <div className="error-message">{errors[row.Bookid]}</div>} {/* Inline error message */}
</td>
</tr>

          ))}
</tbody>
</table>
<button className="save-btn" onClick={handleSave} disabled={isSaveDisabled}>

        Save
</button>
</div>

  );

};

export default Concurrency;
 