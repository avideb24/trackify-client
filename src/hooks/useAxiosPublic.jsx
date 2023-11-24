import axios from "axios";

const axiosPubllic = axios.create({
    baseURL: 'http://localhost:5173'
})

const useAxiosPublic = () => {
    return axiosPubllic;
};

export default useAxiosPublic;