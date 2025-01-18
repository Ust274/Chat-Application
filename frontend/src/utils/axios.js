import axios from 'axios';

export const axiosCon = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,  // This is important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for consistent error handling
axiosCon.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access');
      // You might want to redirect to login or clear auth state
    }
    return Promise.reject(error);
  }
);