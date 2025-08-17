import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://staybuddy-vm71.onrender.com'
});

export default axiosInstance;
