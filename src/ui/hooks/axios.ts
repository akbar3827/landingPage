import axios from "axios";

export const AxiosIntegrateAPI = axios.create({
  baseURL: 'http://localhost:2000',
})