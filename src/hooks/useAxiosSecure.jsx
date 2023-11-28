import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://trackify-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;