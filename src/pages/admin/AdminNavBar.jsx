import { Link, NavLink, useNavigate } from "react-router-dom";
import '../../components/NavBar.css'
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import useCheckUser from "../../hooks/useCheckUser";
import { CiMenuFries } from "react-icons/ci";

const AdminNavBar = () => {

    const { userData, refetch } = useCheckUser();
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        userData;
        refetch();
    }, [userData, refetch])

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
            <div className="navbar max-w-7xl mx-auto">
                <div className="flex-1">
                    <img className="w-10" src={userData.companyLogo} alt="" />
                </div>
                <div className="flex-none text-sm">
                    <div className="hidden lg:flex gap-4 sm:items-center menu-items">
                        <NavLink
                            to="/admin"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/admin/employeeList"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            My Employee List
                        </NavLink>
                        <NavLink
                            to="/admin/addEmployee"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Add An Employee
                        </NavLink>
                        <NavLink
                            to="/admin/assetList"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Asset List
                        </NavLink>
                        <NavLink
                            to="/admin/addAsset"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Add An Asset
                        </NavLink>
                        <NavLink
                            to="/admin/allRequest"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            All Requests
                        </NavLink>
                        <NavLink
                            to="/admin/customRequest"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Custom Requests List
                        </NavLink>
                        <div className="dropdown dropdown-end ml-1">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="text-3xl">
                                    <FaRegUserCircle></FaRegUserCircle>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm bg-[#132644] text-center dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 space-y-2">
                                <li>{userData?.name}</li>
                                <li>{userData?.email}</li>
                                <li>{userData?.birthDate}</li>
                                <li className="inline-block mx-auto">
                                    <Link to={`/admin/updateUser/${userData._id}`}>
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
                                    <p className="text-white text-2xl"><CiMenuFries></CiMenuFries></p>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow">
                                <div className="card-body">
                                    <div className="flex flex-col gap-2 bg-[#132747] p-3 rounded-sm">
                                        <NavLink
                                            to="/admin"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            to="/admin/employeeList"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            My Employee List
                                        </NavLink>
                                        <NavLink
                                            to="/admin/addEmployee"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Add An Employee
                                        </NavLink>
                                        <NavLink
                                            to="/admin/assetList"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Asset List
                                        </NavLink>
                                        <NavLink
                                            to="/admin/addAsset"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Add An Asset
                                        </NavLink>
                                        <NavLink
                                            to="/admin/allRequest"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            All Requests
                                        </NavLink>
                                        <NavLink
                                            to="/admin/customRequest"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                        >
                                            Custom Requests List
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end ml-1">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="text-3xl">
                                    <FaRegUserCircle></FaRegUserCircle>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm bg-[#132644] text-center dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 space-y-2">
                                <li>{userData?.name}</li>
                                <li>{userData?.email}</li>
                                <li>{userData?.birthDate}</li>
                                <li className="inline-block mx-auto">
                                    <Link to={`/admin/updateUser/${userData._id}`}>
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

export default AdminNavBar;