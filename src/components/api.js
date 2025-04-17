import axios from "axios";


function getAuthorizationHeader() {
  const token = localStorage.getItem("token")
  return `Bearer ${token}`
}

const Api = axios.create({
  baseURL: "http://localhost:4000",
});

Api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getAuthorizationHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;