import { Outlet, useLocation } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";


const AdminHome = () => {

    const location = useLocation();
    const noHeader = location.pathname.includes('/admin/addAsset');

    return (
        <div className="w-full h-screen">
            {
                noHeader ? '' : <AdminNavBar></AdminNavBar>
            }
            <Outlet></Outlet>
        </div>
    );
};

export default AdminHome;