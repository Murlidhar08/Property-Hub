import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor (Add Auth Token)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Request Interceptor for Post API
API.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response?.data?.message)
            toast.error(error.response?.data?.message);

        return Promise.reject(error.response || error);
    }
);

export default API;
