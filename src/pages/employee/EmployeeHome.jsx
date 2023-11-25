import { Outlet } from "react-router-dom";
import EmployeeNavBar from "./EmployeeNavBar";


const EmployeeHome = () => {
    return (
        <div className="w-full h-screen">
            <EmployeeNavBar></EmployeeNavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default EmployeeHome;