import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useCheckUser = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [isEmployee, setIsEmployee] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    const { data: userData = {}, refetch } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            const data = res.data;
            // refetch();
            const loggedUserData = data.find(loadedUser => loadedUser.email === user.email);
            if (loggedUserData.role === 'user') {
                setIsEmployee(true);
                setIsAdmin(false);
                // refetch();
            }
            if (loggedUserData.role === 'employee') {
                setIsEmployee(true);
                setIsAdmin(false);
                // refetch();
            }
            if (loggedUserData.role === 'admin') {
                setIsEmployee(false);
                setIsAdmin(true);

            }

            return loggedUserData;
        }
    });


    return { userData, isAdmin, isEmployee, refetch };

};

export default useCheckUser;