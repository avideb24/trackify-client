import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "./Footer";

const Root = () => {

    const location = useLocation();

    const noNavbarFooter = location.pathname.includes('joinEmployee') || location.pathname.includes('joinAdmin') || location.pathname.includes('login');
    
    return (
        <div>
            {noNavbarFooter ? '' : <NavBar></NavBar>}
            <Outlet></Outlet>
            {noNavbarFooter ? '' : <Footer></Footer>}
        </div>
    );
};

export default Root;