import axios from "axios";

const axiosPubllic = axios.create({
    baseURL: 'https://trackify-server.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPubllic;
};

export default useAxiosPublic;