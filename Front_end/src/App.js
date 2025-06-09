import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Licenses from "./components/Licenses";
import LicenseModal from "./components/LicenseModal";
import Concurrency from "./components/Concurrency";
import Books from "./components/Books";
import getAccess from "./services/getAccess";
import Cookies from "js-cookie";
function App() {
  const [bundles, setBundles] = useState([]);
  const [form, setForm] = useState({
    licenseName: "",
    orderNumber: "",
    purchaseDate: "2024-09-07",
    productBundle: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkConcurrency, setBulkConcurrency] = useState(1);
  const [concurrency, setConcurrency] = useState({});
  const [allBundles, setAllBundles] = useState([]);
  const [normalBundles, setNormalBundles] = useState([]);
  const [isPremium, setIsPremium] = useState(true);
  const [isNormal, setIsNormal] = useState(false);
  const [bundleId, setBundleId] = useState(null);
  const [data, setData] = useState([]);
  const [bundleQuery, setBundleQuery] = useState("");
  const [bundleList, setBundleList] = useState([]);
  const [list,setList]=useState(true)
  const [errList,setErrList] =useState(true)
  const [id,setId]=useState("")

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await getAccess();
        const apiKey = response;

        Cookies.set("apiKey", apiKey, { expires: 7 });
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Licenses setId={setId} />} />
          <Route
            path="/license/new"
            element={
              <LicenseModal
                bundles={bundles}
                setBundles={setBundles}
                bulkConcurrency={bulkConcurrency}
                concurrency={concurrency}
                form={form}
                setForm={setForm}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                allBundles={allBundles}
                setAllBundles={setAllBundles}
                normalBundles={normalBundles}
                setNormalBundles={setNormalBundles}
                isPremium={isPremium}
                setIsPremium={setIsPremium}
                isNormal={isNormal}
                setIsNormal={setIsNormal}
                setBulkConcurrency={setBulkConcurrency}
                setConcurrency={setConcurrency}
                setBundleId={setBundleId}
                bundleId={bundleId}
                setData={setData}
                bundleQuery={bundleQuery}
                setBundleQuery={setBundleQuery}
                bundleList={bundleList}
                setBundleList={setBundleList}
                list={list}
                setList={setList}
              />
            }
          />
          <Route path="/license/edit/:id" element={<LicenseModal />} />
          <Route path="/license/:orderNo/books" element={<Books id={id}/>} />
          <Route
            path="/concurrency"
            element={
              <Concurrency
                bundles={bundles}
                bulkConcurrency={bulkConcurrency}
                setBulkConcurrency={setBulkConcurrency}
                concurrency={concurrency}
                setConcurrency={setConcurrency}
                data={data}
                setData={setData}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
