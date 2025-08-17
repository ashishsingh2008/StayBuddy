import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8800";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(BASE_URL + url, {
        withCredentials: true,
      }); setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const reFetch = async () => {
    await fetchData();
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
