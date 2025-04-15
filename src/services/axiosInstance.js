import axios from "axios";
import { BASE_URL } from "../utils/constant";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Don't stringify

    console.log("TOKEN IN SESSION", token);

    if (token) {
      config.headers["Authorization"] = token; // lowercase 'token'
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (respone) => respone,
  (error) => {
    if (error.respone && error.respone?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
