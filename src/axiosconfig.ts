import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  withCredentials: true
});