import _axios, { AxiosInstance } from "axios";

const Axios = (baseURL: string): AxiosInstance => {
    const instance = _axios.create({
        baseURL: baseURL || "http://localhost:5000/api", //JSON-Server端口位置
        timeout: 2000,
    });

    return instance;
};

export { Axios as axios };
export default Axios("");

export {};
