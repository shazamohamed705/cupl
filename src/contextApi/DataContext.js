import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [host, setHost] = useState("yalla coupon");
  const [loading, setLoading] = useState(true);

  function getHostName(url) {
    let hostname = new URL(url).hostname;
    if (hostname.startsWith("www.")) {
      hostname = hostname.substring(4); // Remove 'www.' prefix
      // Remove top-level domain
      hostname = hostname.split(".").slice(0, -1).join(".");
      return hostname;
    } else {
      hostname = hostname.split(".").slice(0, -1).join(".");
      return hostname;
    }
  }
  const url = window.location;
  // useEffect(() => {
  //   const hostname = getHostName(url);
  //   setHost(hostname);
  // }, [url]);
  useEffect(() => {
    const hostname = window.location.hostname; // يحفظ الدومين كما هو بدون تعديل
    setHost(hostname);
  }, [url]);
  // Example usage:

  // const navigate = useNavigate();
  const getData = async () => {
    try {
      setLoading(true);
      if (id) {
        // console.log(id);
        const res = await axios.get(
          `https://coupon-lands.com/back-end/api/stores/get/${id}/${host}`
          // `https://coupon-lands.com/back-end/api/stores/get/noon-sa-en/tawfiiir` 
        );
        // const res = await axios.get(`https://coupon-lands.com/back-end/api/stores/get/noon-ae/saudicode`);
        setData(res?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setData("notFound");
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <DataContext.Provider
      value={{ data, setData, id, setId, host, loading, setLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};
