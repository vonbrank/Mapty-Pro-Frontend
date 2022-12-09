import _axios, { AxiosInstance } from "axios";
import { getServiceBaseURL } from "../config/SERVICE_BASE_API_URLS";

const Axios = (baseURL: string): AxiosInstance => {
  const instance = _axios.create({
    baseURL: baseURL || getServiceBaseURL(), //JSON-Server端口位置
    timeout: 2000,
  });

  return instance;
};

export { Axios as axios };
export default Axios("");

export {};
