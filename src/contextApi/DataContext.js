import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setHost(window.location.hostname || "");
  }, []);

  useEffect(() => {
    if (!id || !host) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      if (isMounted) {
        setLoading(true);
      }
      try {
        const res = await axios.get(
          `https://coupon-lands.com/back-end/api/stores/get/${id}/${host}`,
          { signal: controller.signal }
        );
        if (isMounted) {
          setData(res?.data);
        }
      } catch (error) {
        if (!axios.isCancel(error) && isMounted) {
          setData("notFound");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, host]);

  return (
    <DataContext.Provider
      value={{ data, setData, id, setId, host, loading, setLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};
