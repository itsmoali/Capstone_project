import axios from "axios";

const client = axios.create({
    baseURL: "https://backend-obio.onrender.com"
  });
  

export default client;