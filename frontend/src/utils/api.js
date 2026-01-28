// api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn(
    "⚠️ VITE_API_BASE_URL is not set. Using default: http://localhost:5000"
  );
}

const api = axios.create({
  baseURL: API_BASE_URL + "/api", // append /api
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      console.error("❌ Network Error: Could not connect to the server.");
      console.error("💡 Make sure the backend server is running and VITE_API_BASE_URL is correct.");
    }
    
    // Log API errors for debugging
    if (error.response) {
      console.error(`❌ API Error [${error.response.status}]:`, error.response.data?.message || error.response.statusText);
      console.error(`   URL: ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
    }
    
    return Promise.reject(error);
  }
);

export default api;
