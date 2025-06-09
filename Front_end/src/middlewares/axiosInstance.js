import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8001/api', 
    baseURL: 'http://localhost:8001/api', 
    timeout: 5000, 
});

export default axiosInstance;
