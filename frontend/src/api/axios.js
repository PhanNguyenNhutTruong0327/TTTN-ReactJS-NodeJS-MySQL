import axios from 'axios';
import { apiURL } from './config';

// tao  1 instance cua axios
const axiosInstance = axios.create({
    baseURL: apiURL,
    timeout: 50000,
    headers:{
        "Content-Type":"application/json",
    }
});


axiosInstance.enableUploadFile = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
}

axiosInstance.enableJson = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json';
};

axiosInstance.getAuthToken = (role) => {
    return JSON.parse(localStorage.getItem(`${role}Token`));
};


export default axiosInstance;