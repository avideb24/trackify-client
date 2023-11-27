import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import { useEffect, useState } from "react";


const MyTeam = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

    const { data: teamData = [] } = useQuery({
        queryKey: ['teamData', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teams/${user.email}`);
            return res.data;
        }
    })

    useEffect(() => {
        if (teamData.length > 0) {
            const currentDate = new Date();
            const upcomingBirthdays = [];
            const passedBirthdays = [];

            teamData.forEach(member => {
                const memberBirthDate = new Date(member.birthDate);
                memberBirthDate.setFullYear(currentDate.getFullYear()); // Set the year to the current year

                if (memberBirthDate.getMonth() === currentDate.getMonth()) {
                    // Check if it's upcoming or passed
                    const remainingDays = Math.ceil((memberBirthDate - currentDate) / (1000 * 60 * 60 * 24));

                    if (remainingDays >= 0) {
                        upcomingBirthdays.push({ ...member, remainingDays });
                    } else {
                        passedBirthdays.push({ ...member });
                    }
                }
            });

            // Set the state with the results
            setUpcomingBirthdays(upcomingBirthdays);
        }
    }, [teamData])

    // console.log(teamData);

    return (
        <div className="max-w-7xl mx-auto py-10">
            {
                teamData.message === false ?
                    <div className="text-center text-red-600 font-bold my-10">You are not in any tean.</div>
                    :
                    <div>
                        <div className="mt-2">
                            <SectionTitle heading={'Upcoming Events'}></SectionTitle>
                            {
                                upcomingBirthdays.length > 0 &&
                                <div className="my-6">
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            {/* head */}
                                            <thead className="text-secondary">
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Birth Date</th>
                                                    <th>Remaining Days</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    upcomingBirthdays?.map(member =>
                                                        <tr key={member._id}>
                                                            <td>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                            <img src={member.image} alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {member.name}
                                                            </td>
                                                            <td>{member.birthDate}</td>
                                                            <th>
                                                                {member.remainingDays}
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
                        <div className="my-10">
                            <div className="my-5">
                                <SectionTitle heading={'My Team'}></SectionTitle>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead className="text-secondary">
                                        <tr>
                                            <th></th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            teamData?.map((member, idx) =>
                                                <tr key={idx}>
                                                    <th>
                                                        {idx + 1}
                                                    </th>
                                                    <td>
                                                        {
                                                            member.image ?
                                                                <div className="flex items-center gap-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                            <img src={member.image} alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="text-3xl">
                                                                    <FaRegUserCircle></FaRegUserCircle>
                                                                </div>
                                                        }
                                                    </td>
                                                    <td>
                                                        {member.name}
                                                    </td>
                                                    <td className="uppercase">{member.role}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
            }


        </div>
    );
};

export default MyTeam;