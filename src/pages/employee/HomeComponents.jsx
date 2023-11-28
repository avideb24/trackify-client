import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";


const HomeComponents = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userRequests = [], isPending } = useQuery({
        queryKey: ["userRequests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customRequests/employee/${user.email}`);
            return res.data;
        }
    })

    console.log(userRequests);


    return (
        <div>
            {
                isPending ?
                    <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div>
                        {
                            userRequests?.length === 0 ? '' :
                                <div>
                                    <SectionTitle heading={"My Custom Requests"}></SectionTitle>
                                    <div className="flex flex-wrap gap-5 mt-5">
                                        {
                                            userRequests?.map(request =>
                                                <div key={request._id} className="w-60 text-center bg-[#14294b] p-3 rounded-md space-y-3">
                                                    <h2>Name: {request.name}</h2>
                                                    <p>Price: ${request.price}</p>
                                                    <p>Type: {request.type}</p>
                                                    <p>Status: Pending</p>
                                                    <button className="bg-secondary text-primary py-1 px-4 rounded-md" onClick={() => document.getElementById(`my_modal_${request._id}`).showModal()}>View Details</button>
                                                    <dialog id={`my_modal_${request._id}`} className="modal">
                                                        <div className="modal-box bg-[#14294b]">
                                                            <form method="dialog">
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                            </form>
                                                            <div className="flex flex-col justify-center items-center p-4 space-y-2">
                                                                <img className="w-72 mx-auto object-cover rounded-md" src={request.image} alt="" />
                                                                <div>
                                                                    <h2>Name: {request.name}</h2>
                                                                    <p>Price: ${request.price}</p>
                                                                    <p>Type: {request.type}</p>
                                                                    <p>Need:  {request.need}</p>
                                                                    <p>Information: {request.info}</p>
                                                                    <p>Status: Pending</p>
                                                                    <div className="flex justify-center gap-8 mt-5">
                                                                        <Link to={`/employee/updateCustomReq/${request._id}`}>
                                                                            <button className="text-white bg-green-600 py-1 px-5 rounded-md">Update</button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default HomeComponents;