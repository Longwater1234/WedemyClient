import axios, { AxiosError } from "axios";
import { ElMessage } from "element-plus";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_ROOT_URL;

function getServiceUrl(): string {
  return BACKEND_URL;
}

/** global axios instance */
export const httpUtil = axios.create({
  baseURL: getServiceUrl(),
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "X-Requested-With": "XMLHttpRequest"
  },
  timeout: 15000, // 15 seconds
  withCredentials: true
});

// global simple Axios error handler
export function handleApiError(err: AxiosError | unknown) {
  // @ts-ignore
  const msg = err.response?.data?.message ?? err.message;
  ElMessage.error(msg);
  console.error("AXIOS", msg);
}
