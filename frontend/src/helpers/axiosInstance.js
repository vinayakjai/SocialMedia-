import axios from "axios";

const axiosinstance=axios.create();
axiosinstance.defaults.baseURL="http://localhost:3200/api/v1/";
axiosinstance.defaults.withCredentials=true;

export default axiosinstance;

