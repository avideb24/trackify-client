import { Outlet } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";


const AdminHome = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: companyName = ''} = useQuery({
        queryKey: ['adminName', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get('/users');
            const adminArray = res.data.find(getUser => getUser.email = user.email);
            return adminArray.companyName
        }
    })


    return (
        <div className="mx-4">
            <Helmet>
                <title>{companyName}</title>
            </Helmet>
            <AdminNavBar></AdminNavBar>            
            <Outlet></Outlet>
        </div>
    );
};

export default AdminHome;