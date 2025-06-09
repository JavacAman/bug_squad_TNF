import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';

axiosInstance.interceptors.request.use(
    (config) => {
        const apiKey = Cookies.get("apiKey");
        config.headers['x-api-key'] ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxpY2Vuc2UiLCJpYXQiOjE1MTYyMzkwMjJ9._iX8I1Mwf93BDBesAGPs8Hr4buWGwQsRuh-EMifK7J4"

        console.log('Request:', config); 
        return config; 
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response.data; 
    },
    (error) => {
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);
