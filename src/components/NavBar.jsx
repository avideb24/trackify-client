import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import './NavBar.css';


const NavBar = () => {

    return (
        <div className="bg-primary">
            <div className="navbar max-w-7xl mx-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Trackify</a>
                </div>
                <div className="flex-none">

                    {/* desktop links / without user */}
                    <div className="hidden sm:flex gap-8 sm:items-center menu-items">
                                    <NavLink
                                        to="/"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "active" : ""
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/joinEmployee"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "active" : ""
                                        }
                                    >
                                        Join As Employee
                                    </NavLink>
                                    <NavLink
                                        to="/joinAdmin"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "active" : ""
                                        }
                                    >
                                        Join As Admin
                                    </NavLink>
                                    <Link to='/login'>
                                        <Button text="Login"></Button>
                                    </Link>
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

                    <div className="dropdown dropdown-end ml-20 hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow   rounded-box w-20">
                            <li><button>Profile</button></li>
                            <li><button>Logut</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;