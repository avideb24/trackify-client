import { Link, NavLink, useNavigate } from "react-router-dom";
import '../../components/NavBar.css'
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaRegUserCircle } from "react-icons/fa";
import useCheckUser from "../../hooks/useCheckUser";
import { CiMenuFries } from "react-icons/ci";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const EmployeeNavBar = () => {

    const { userData } = useCheckUser();
    const { user, signOutUser, } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: adminInfo = {} } = useQuery({
        queryKey: ['adminInfo', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teams/${user.email}`);
            const adminInfo = res.data.find(loadedUser => loadedUser.role === 'admin')
            return adminInfo;
        }
    })


    const handleLogOut = () => {
        signOutUser()
            .then(res => {
                console.log(res);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
    }

    // console.log(userData);

    return (
        <div className="bg-primary">
            <Helmet>
                <title>{adminInfo.companyName}</title>
            </Helmet>
            <div className="navbar max-w-7xl mx-auto">
                <div className="flex-1">
                    {
                        adminInfo?.companyLogo ?
                            <img className="w-10" src={adminInfo.companyLogo} alt="" />
                            :
                            <a className="btn btn-ghost text-xl">Trackify</a>
                    }
                </div>
                <div className="flex-none text-sm">
                    <div className="hidden lg:flex gap-4 sm:items-center menu-items">
                        <NavLink
                            to="/employee"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/employee/myTeam"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            My Team
                        </NavLink>
                        <NavLink
                            to="/employee/myAsset"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            My Assets
                        </NavLink>
                        <NavLink
                            to="/employee/requestAsset"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Request For An Asset
                        </NavLink>
                        <NavLink
                            to="/employee/makeCustomRequest"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Make A Custom Request
                        </NavLink>
                        <div className="dropdown dropdown-end ml-1">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                {
                                    userData.image ?
                                        <img className="w-9 h-9 object-cover rounded-full" src={userData.image} alt="" />
                                        :
                                        <div className="text-3xl">
                                            <FaRegUserCircle></FaRegUserCircle>
                                        </div>
                                }
                            </label>
                            <ul tabIndex={0} className="menu menu-sm bg-[#132644] text-center dropdown-content mt-3 z-50 p-2 shadow w-52 rounded-box space-y-2">
                                <li>{userData?.name}</li>
                                <li>{userData?.email}</li>
                                <li>{userData?.birthDate}</li>
                                <li className="inline-block mx-auto">
                                    <Link to={`/employee/updateUser/${userData._id}`}>
                                        <button className="bg-secondary text-primary text-sm px-3 py-1 rounded-md">Update</button>
                                    </Link>
                                </li>
                                <li className="inline-block mx-auto">
                                    <button onClick={handleLogOut} className="bg-secondary text-primary text-sm  rounded-md">Log Out</button>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* mobile dropdown / without user */}
                    <div className="flex items-center lg:hidden">
                        <div className="dropdown dropdown-end block lg:hidden">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <p className="text-3xl"><CiMenuFries></CiMenuFries></p>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-60 shadow">
                                <div className="card-body">
                                    <div className="flex flex-col items-center text-center gap-2 bg-[#172f55] p-3 rounded-sm">
                                        <NavLink
                                            to="/employee"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            to="/employee/myTeam"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            My Team
                                        </NavLink>
                                        <NavLink
                                            to="/employee/myAsset"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            My Assets
                                        </NavLink>
                                        <NavLink
                                            to="/employee/requestAsset"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Request For An Asset
                                        </NavLink>
                                        <NavLink
                                            to="/employee/makeCustomRequest"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Make A Custom Request
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end ml-1">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            {
                                    userData.image ?
                                        <img className="w-9 h-9 object-cover rounded-full" src={userData.image} alt="" />
                                        :
                                        <div className="text-3xl">
                                            <FaRegUserCircle></FaRegUserCircle>
                                        </div>
                                }
                            </label>
                            <ul tabIndex={0} className="menu menu-sm bg-[#132644] text-center dropdown-content mt-3 z-50 p-2 shadow  rounded-box w-52 space-y-2">
                                <li>{userData?.name}</li>
                                <li>{userData?.email}</li>
                                <li>{userData?.birthDate}</li>
                                <li className="inline-block mx-auto">
                                    <Link to={`/employee/updateUser/${userData._id}`}>
                                        <button className="bg-secondary text-primary text-sm px-3 py-1 rounded-md">Update</button>
                                    </Link>
                                </li>
                                <li className="inline-block mx-auto">
                                    <button onClick={handleLogOut} className="bg-secondary text-primary text-sm  rounded-md">Log Out</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeNavBar;