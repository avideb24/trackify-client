import { Outlet } from "react-router-dom";
import EmployeeNavBar from "./EmployeeNavBar";


const EmployeeHome = () => {
    return (
        <div className="mx-4 bg-primary">
            <EmployeeNavBar></EmployeeNavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default EmployeeHome;