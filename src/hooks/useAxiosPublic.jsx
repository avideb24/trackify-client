import axios from "axios";

const axiosPubllic = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPubllic;
};

export default useAxiosPublic;