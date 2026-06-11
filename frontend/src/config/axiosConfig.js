import axios from "axios";
const api = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000",
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export default api;