
import {useEffect,useState} from "react";
import axiosInstance from "./api";



const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
  
      try {
        let res = await axiosInstance.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await  axiosInstance.get(url) ;

      setData(res.data);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return { data, loading, error,reFetch};
};

export default useFetch;
