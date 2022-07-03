import axios, { AxiosError, AxiosResponse } from "axios";

/** global axios instance */
const http = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_ROOT_URL,
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  timeout: 8000,
  withCredentials: true
});

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  function (error: AxiosError) {
    if (error.response && error.response.status === 500) {
      return window.location.replace("/Error500");
    }
    return Promise.reject(error);
  });

export default http;