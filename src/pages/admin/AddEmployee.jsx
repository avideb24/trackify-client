// import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const AddEmployee = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [totalAssets, setTotalAssets] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        axiosSecure.get('/assets')
            .then(res => {
                const myAssets = res.data.filter(asset => asset.email === user?.email);
                setTotalAssets(myAssets)
            })
    }, [axiosSecure, user?.email]);


    const { data: getUsers = [], refetch } = useQuery({
        queryKey: ['getUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            const users = res.data.filter(user => user.role === 'user');
            return users;
        }
    })

    const handleCheckboxChange = (userEmail) => {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.includes(userEmail)) {
                return prevSelectedUsers.filter(email => email !== userEmail);
            } else {
                return [...prevSelectedUsers, userEmail];
            }
        });
    };

    const handleAddEmployee = async () => {
        if (selectedUsers.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Please Select Employees",
            });
        }
        else {
            const adminEmail = user?.email;
            const teamData = { adminEmail, teamMembers: selectedUsers };
            console.log(teamData);


            const res = await axios.post('http://localhost:5000/teams', teamData);
            console.log(res.data);
            if (res.data.message) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }



    


    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="text-xl max-w-xl mx-auto flex justify-between items-center">
                <h2>Total Assets: {totalAssets?.length}</h2>
                <h2>Package Limit: 10</h2>
                <Link to="/admin/package">
                    <Button text={"Increase Limit"}></Button>
                </Link>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="text-secondary">
                            <tr>
                                <th>
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getUsers.map(user =>
                                    <tr key={user._id}>
                                        <th>
                                            <label className="border-2 border-[#3bedb2] rounded-md">
                                                <input type="checkbox" className="checkbox"
                                                    checked={selectedUsers.includes(user.email)}
                                                    onChange={() => handleCheckboxChange(user.email)}
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.name}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="text-center mt-10">
                        {/* <Button text={"Add"}></Button> */}
                        <button type="button" onClick={handleAddEmployee} className="bg-secondary px-6 py-2 text-primary rounded-md">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;