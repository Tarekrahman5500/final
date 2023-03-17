import axios from "axios";
const baseUrl = "http://localhost:5000/api/v1/";
const axiosInstance = axios.create({
    baseURL: baseUrl,

})

export default axiosInstance