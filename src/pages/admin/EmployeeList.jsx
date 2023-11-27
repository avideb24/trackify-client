import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const EmployeeList = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [employeeData, setEmployeeData] = useState([]);

    const { data: employeeList = [], refetch, isPending } = useQuery({
        queryKey: ['employeeList', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/teams');
            const adminsData = res.data.find(data => data.adminEmail === user.email);
            const team = adminsData.teamMembers;
            return team;
        }
    })

    useEffect(() => {
        if (employeeList.length > 0) {
            const fetchEmployeeData = async () => {
                const emails = employeeList.map(employee => ({ email: employee }));
                const res = await axiosSecure.get('/employees', { params: { employeeList: JSON.stringify(emails) } });
                console.log(res.data);
                setEmployeeData(res.data)
            }
            fetchEmployeeData();
        }
    }, [axiosSecure, employeeList])

    const handleDeleteEmployee = email => {
        const info = { adminEmail: user.email }
        console.log(info);
        axiosSecure.delete(`/teams/${email}`, { data: info })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Employee Removed!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                refetch();
            })
    }

    console.log(employeeList);

    return (
        <div className="max-w-7xl mx-auto my-10">
            <h2>Total Employees: {employeeData.length}</h2>
            <div>
                {
                    isPending ?
                    <div className="text-center text-secondary py-6">Data Loading...</div>
                        :
                        <div>
                            {
                                employeeData.length === 0 ?
                                    <div className="text-center font-bold">
                                        No Data Found
                                    </div>
                                    :
                                    <div className="my-5">
                                        <div className="overflow-x-auto">
                                            <table className="table uppercase">
                                                <thead className="text-secondary">
                                                    <tr>
                                                        <th></th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Role</th>
                                                        <th>Activity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        employeeData?.map((employee, idx) =>
                                                            <tr key={idx}>
                                                                <th>
                                                                    {idx + 1}
                                                                </th>
                                                                <td>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="avatar">
                                                                            <div className="mask mask-squircle w-12 h-12">
                                                                                <img src={employee.image} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {employee.name}
                                                                </td>
                                                                <td>{employee.role}</td>
                                                                <th>
                                                                    <button onClick={() => handleDeleteEmployee(employee.email)} className="text-2xl text-red-600 "><FaTrashAlt></FaTrashAlt></button>
                                                                </th>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default EmployeeList;

