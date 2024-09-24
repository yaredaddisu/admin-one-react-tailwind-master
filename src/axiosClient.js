import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});
 
// Add a request interceptor to include the token in headers
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
