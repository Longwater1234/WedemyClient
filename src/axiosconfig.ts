import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_SERVER_ROOT_URL,
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  withCredentials: true
});