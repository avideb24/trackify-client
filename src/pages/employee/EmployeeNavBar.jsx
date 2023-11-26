import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import '../../components/NavBar.css'
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaRegUserCircle } from "react-icons/fa";
import useCheckUser from "../../hooks/useCheckUser";

const EmployeeNavBar = () => {

    const {userData} = useCheckUser();
    const { signOutUser,  } = useAuth();
    const navigate = useNavigate();


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
                    <a className="btn btn-ghost text-xl">Trackify</a>
                </div>
                <div className="flex-none text-sm">
                    <div className="hidden sm:flex gap-4 sm:items-center menu-items">
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
                                <div className="text-3xl">
                                    <FaRegUserCircle></FaRegUserCircle>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm bg-[#132644] text-center dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-32 space-y-2">
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
                    <div className="dropdown dropdown-end block sm:hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <p>click</p>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow">
                            <div className="card-body">
                                <div className="flex flex-col gap-2 bg-primary">
                                    <NavLink
                                        to="/"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/joinEmployee"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                        }
                                    >
                                        Join As Employee
                                    </NavLink>
                                    <NavLink
                                        to="/joinAdmin"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                        }
                                    >
                                        Join As Admin
                                    </NavLink>
                                    <Link to='/login'>
                                        <Button text="Login"></Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeNavBar;