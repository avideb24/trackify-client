import { Outlet } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";


const AdminHome = () => {



    return (
        <div className="w-full h-screen">
            <AdminNavBar></AdminNavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminHome;