import Home from "../pages/Home";
import JoinAdmin from "../pages/JoinAdmin";
import JoinEmployee from "../pages/JoinEmployee";
import Login from "../pages/Login";
import Root from "../pages/Root";

import { createBrowserRouter } from "react-router-dom";

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
    }
])

