import { Outlet } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";


const AdminHome = () => {


    return (
        <div className="w-full">
            <AdminNavBar></AdminNavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminHome;