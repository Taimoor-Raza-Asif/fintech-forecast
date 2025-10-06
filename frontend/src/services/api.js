import axios from "axios";

// Update if your backend runs on a different host/port
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
