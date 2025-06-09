import React, { useState, useRef, useEffect } from "react";
import "./LicenseModal.css";
import { useNavigate } from "react-router-dom";
import {getBundles,getSearchedBundle} from "../services/bundleService";
import { createLicense } from "../services/licenseService";

const LicenseModal = ({
  license,
  onSave,
  onClose,
  bundles,
  setBundles,
  bulkConcurrency,
  concurrency,
  form,
  setForm,
  setSearchQuery,
  searchQuery,
  allBundles,
  setAllBundles,
  normalBundles,
  setNormalBundles,
  isPremium,
  setIsPremium,
  isNormal,
  setIsNormal,
  setBulkConcurrency,
  setConcurrency,
  setBundleId,
  bundleId,
  setData,
  bundleQuery,
  setBundleQuery,
  bundleList,
  setBundleList,
  list,
  setList

}) => {
  console.log("bul1", bulkConcurrency);
  const [count, setCount] = useState(0);

  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef(null);
  const [errormsg, setErrmsg] = useState("");
  const [err1, setErr1] = useState(false);

  const [licenseName, setLicenseName] = useState("");

 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setIsNormal(false);
    setIsPremium(true);
  }, [setIsNormal, setIsPremium])

  const navigateToConcurrency = () => {
    navigate("/concurrency", { state: { Books: bundles } });
  };

  const handleChangeName = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log("res2", concurrency);

  const handleSelectBundle = async (bundleName) => {
    const result = await getBundles(bundleName);
  
    
    if (result.message === "No bundles found with this name") {
      setBundles([]);
      setAllBundles([]);
      setNormalBundles([]);
      setBundleId(null);
      setErr1(true);
      setBundleList([])
      setList(false)
      console.log("hello4");
      setErrmsg("No bundles found with this name");
    } else {
      const updatedNormal = result.normal.map(item => ({
        ...item,
        Concurrency: 0
      }));
      setBundles(result.premium);
      setAllBundles(result.allPremiumBooks);
      setNormalBundles(updatedNormal);
      setBundleId(result.bundleId);
      setBundleList([])
      setList(false)

    }
    console.log("bundle3", result);
    console.log("result", result);

    setCount(bundles.length);
    setSearchQuery(bundleName); 
    setShowResults(false); 
    setBundleQuery(''); 

  };


  const handleKeyDownLicense = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setForm({ ...form, application: e.target.value });
      console.log("License Name Set:", e.target.value);
    }
  };
  // console.log("value", form.application);
  const handleKeyDownList=async (e)=>{
    if(e.key=="Enter")
    {
      e.preventDefault();
      try{
          const result1=await getSearchedBundle(bundleQuery)
          setBundleList(result1);
      }
      catch(error)
      {
        console.log(error)
      }

    }
  }

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        // const result1=await getSearchedBundle()
        // const result = await getBundles(searchQuery);
        const result1=await getSearchedBundle(searchQuery);
        console.log("list",result1);

        setList(true)
        setBundleList(result1)
        


      } catch (error) {
        console.error("Failed to fetch bundles:", error);
      }

      searchInputRef.current.blur();
    }
  };
  const handleClose = () => {
    setAllBundles([]);
    setBundles([]);
    setIsPremium(false);
    setNormalBundles([]);
    setForm({
      licenseName: " ",
      orderNumber: "",
      purchaseDate: "2024-09-07",
      productBundle: "",
    });
    setBulkConcurrency(1);
    setConcurrency({});
    setSearchQuery("");
    setBundleId(null);
    setData([]);
    setBundleList([])
    setList(false)

    navigate(-1);
  };
  console.log("count", count);
  const handlePremium = () => {
    setIsPremium(true);
    setIsNormal(false);
  };
  const handleNormal = () => {
    setIsNormal(true);
    setIsPremium(false);
  };
  const handleSearchClick = () => {
    setShowResults(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const licenseData = {
      License_id: form.orderNumber,
      License_name: form.application,
      concurrency: bulkConcurrency,
      books: isNormal ? normalBundles : concurrency,
      bundleId: bundleId,
      isPaid: isPremium,
    };
    console.log("hello1",licenseData)
    console.log("concurrency",concurrency)


    try {
    
      const result = await createLicense(licenseData);
      console.log("License created successfully:", result);
      setAllBundles([]);
      setBundles([]);
      setIsPremium(false);
      setNormalBundles([]);
      setForm({
        licenseName: " ",
        orderNumber: "",
        purchaseDate: "2024-09-07",
        productBundle: "",
      });
      setBulkConcurrency(1);
      setConcurrency({});
      setSearchQuery("");
      setBundleId(null);
      setData([]);

      navigate(-1);
    } catch (error) {
      console.error("Error creating license:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${isPremium ? "active" : ""}`}
          onClick={handlePremium}
        >
          Premium
        </button>
        <button
          className={`toggle-button ${isNormal ? "active" : ""}`}
          onClick={handleNormal}
        >
          Normal
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>License Name</label>
        <input
          type="text"
          name="application"
          value={form.application}
          onChange={handleChangeName}
          onKeyDown={handleKeyDownLicense}
          required
        />

        <label>Order Number</label>
        <input
          type="text"
          name="orderNumber"
          value={form.orderNumber}
          onChange={handleChange}
          required
        />
        <div className="product-bundle-section">
          <label>Product Bundle</label>
          <div className="search-input-container">
            <input
              ref={searchInputRef}
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={(e) => {
                setErrmsg("");
                setErr1(false);
                setSearchQuery(e.target.value);
                setShowResults(true);
                setBundleQuery(e.target.value)
                
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search for bundles..."
              required
            />
            <button
              type="button"
              className="search-button"
              onClick={handleSearchClick}
            ></button>
          </div>
          {showResults && bundleList.length > 0 && (
        <ul className="dropdown">
          {bundleList.map(bundle => (
            <li 
              key={bundle.id} 
              onClick={() => handleSelectBundle(bundle.BundleName)} // Select bundle on click
            >
              {bundle.BundleName}
            </li>
          ))}
        </ul>
      )}
          {/* {list && bundleList.length > 0 && (
        <ul className="dropdown">
          {bundleList.map(bundle => (
            <li key={bundle.id}>{bundle.BundleName}</li>
          ))}
        </ul>
      )} */}

          {/* {bundleList.length > 0 && (
        <div className="bundle-dropdown">
          <label>Select a Bundle:</label>
          <select
            onChange={(e) => setBundleId(e.target.value)}
            value={bundleId || ""}
          >
            <option value="" disabled>
              Select a bundle
            </option>
            {bundleList.map((bundle) => (
              <option key={bundle.id} value={bundle.id}>
                {bundle.name} - ${bundle.price}
              </option>
            ))}
          </select>
        </div>
      )} */}
          <div className="bundle-status">
            <span className="status available">
              Available:{" "}
              {err1
                ? 0
                : isNormal
                ? normalBundles.length > 0
                  ? normalBundles.length
                  : 0
                : allBundles.length > 0
                ? allBundles.length
                : 0}
            </span>
          </div>

          {err1 && <div className="error-message">{errormsg}</div>}
        </div>

        {isPremium && bundles.length > 0 && (
          <div className="drm-policies-section">
            <h3>
              <b>DRM Policies</b>
            </h3>
            <p>
              <b>
                {bundles.length > 0 ? bundles.length : 0} titles are DRM
                protected. Please review/edit the titles.
              </b>
            </p>
            <div className="drm-details">
              <div>
                <p>CONCURRENCY</p>
                <p>
                  <b>
                    {Object.keys(concurrency).length > 0
                      ? `Title Specific`
                      : bulkConcurrency}
                  </b>
                </p>
              </div>

              <div>
                <p>PRINT/COPY</p>
                <p>
                  <b>20</b>
                </p>
              </div>
            </div>
            <button onClick={navigateToConcurrency}>
              View/Edit concurrency per title
            </button>
          </div>
        )}

        <div className="form-buttons">
          <button type="submit" className="save-button">
            SAVE
          </button>
          <button type="button" className="cancel-button" onClick={handleClose}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default LicenseModal;
