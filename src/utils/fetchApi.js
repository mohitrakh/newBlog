import axios from "axios";
const customFetch = axios.create({
  baseUrl: "https://blog-deploy-afnh.onrender.com/api",
});

export default customFetch;
