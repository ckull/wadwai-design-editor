import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3001",
});

export default axiosApi;