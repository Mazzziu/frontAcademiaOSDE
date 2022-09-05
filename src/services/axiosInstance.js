import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/academia-backend/rest",
});

export default axiosInstance;
