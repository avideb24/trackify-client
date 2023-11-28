import Home from "../pages/Home";
import JoinAdmin from "../pages/JoinAdmin";
import JoinEmployee from "../pages/JoinEmployee";
import Login from "../pages/Login";
import Root from "../pages/Root";

import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";
import EmployeeHome from "../pages/employee/EmployeeHome";
import EmployeeList from "../pages/admin/EmployeeList";
import AddEmployee from "../pages/admin/AddEmployee";
import AddAsset from "../pages/admin/AddAsset";
import AssetList from "../pages/admin/AssetList";
import AllRequest from "../pages/admin/AllRequest";
import CustomRequest from "../pages/admin/CustomRequest";
import MyTeam from "../pages/employee/MyTeam";
import MyAssets from "../pages/employee/MyAssets";
import RequestAsset from "../pages/employee/RequestAsset";
import EmployeeCustomReq from "../pages/employee/EmployeeCustomReq";
import UpdateAsset from "../pages/admin/UpdateAsset";
import Package from "../components/Package";
import Payment from "../pages/admin/Payment";
import UpdateUser from "../components/UpdateUser";
import AdminHome2 from "../pages/admin/AdminHome2";
import EmployeeHome2 from "../pages/employee/EmployeeHome2";
import UpdateCustomReq from "../pages/employee/UpdateCustomReq";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/joinEmployee',
                element: <JoinEmployee></JoinEmployee>
            },
            {
                path: '/joinAdmin',
                element: <JoinAdmin></JoinAdmin>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminHome></AdminHome>,
        children: [
            {
                path: '/admin',
                element: <AdminHome2></AdminHome2>
            },
            {
                path: '/admin/employeeList',
                element: <EmployeeList></EmployeeList>
            },
            {
                path: '/admin/addEmployee',
                element: <AddEmployee></AddEmployee>
            },
            {
                path: '/admin/assetList',
                element: <AssetList></AssetList>
            },
            {
                path: '/admin/addAsset',
                element: <AddAsset></AddAsset>
            },
            {
                path: '/admin/updateAsset/:id',
                element: <UpdateAsset></UpdateAsset>,
                loader: ({params}) => fetch(`http://localhost:5000/assets/${params.id}`)
            },
            {
                path: '/admin/allRequest',
                element: <AllRequest></AllRequest>
            },
            {
                path: '/admin/customRequest',
                element: <CustomRequest></CustomRequest>
            },
            {
                path: '/admin/package',
                element: <Package></Package>
            },
            {
                path: '/admin/payment/:price',
                element: <Payment></Payment>
            },
            {
                path: '/admin/updateUser/:id',
                element: <UpdateUser></UpdateUser>,
                loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
            },
        ]
    },
    {
        path: '/employee',
        element: <EmployeeHome></EmployeeHome>,
        children: [
            {
                path: '/employee/myTeam',
                element: <MyTeam></MyTeam>
            },
            {
                path: '/employee',
                element: <EmployeeHome2></EmployeeHome2>
            },
            {
                path: '/employee/myAsset',
                element: <MyAssets></MyAssets>
            },
            {
                path: '/employee/requestAsset',
                element: <RequestAsset></RequestAsset>
            },
            {
                path: '/employee/makeCustomRequest',
                element: <EmployeeCustomReq></EmployeeCustomReq>
            },
            {
                path: '/employee/updateCustomReq/:id',
                element: <UpdateCustomReq></UpdateCustomReq>             
            },
            {
                path: '/employee/updateUser/:id',
                element: <UpdateUser></UpdateUser>,
                loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
            },
        ]
    },

])

