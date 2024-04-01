import axios from "axios";

const client = axios.create({
    baseURL: "https://backend-obio.onrender.com"
    // baseURL: "http://127.0.0.1:8000/",
  });
  

export default client;