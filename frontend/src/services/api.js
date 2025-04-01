import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});

// Request Interceptor (Add Auth Token & Set Dynamic Headers)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Check if the request contains FormData
    if (config.data instanceof FormData)
        config.headers["Content-Type"] = "multipart/form-data";
    else
        config.headers["Content-Type"] = "application/json";

    return config;
});

// Response Interceptor (Handle Errors)
API.interceptors.response.use(
    (response) => response.data,
    (error) => {
        let message = error.response?.data?.message;
        if (message) toast.error(message);

        // Clear Token if invalid
        if (message === "Invalid token" || message === "Token expired")
            localStorage.removeItem("token");

        return Promise.reject(error.response || error);
    }
);

export default API;
