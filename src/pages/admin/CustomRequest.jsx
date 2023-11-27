import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const CustomRequest = () => {


    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: customRequests = [], isPending } = useQuery({
        queryKey: ['customRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customRequests/${user.email}`);
            return res.data
        }
    })

    console.log(customRequests);

    return (
        <div className="max-w-7xl mx-auto py-10">
            {
                isPending ?
                <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div className="flex flex-wrap gap-5">
                        {
                            customRequests?.map(request =>
                                <div key={request._id} className="bg-[#132747] w-96 text-center rounded-md space-y-3 p-4">
                                    <img src={request.image} className="w-full rounded-md object-cover" alt="" />
                                    <h2>Name: {request.name}</h2>
                                    <p>Price: ${request.price}</p>
                                    <p>Type: {request.type}</p>
                                    <p>Need: {request.need}</p>
                                    <p>Information: {request.info}</p>
                                    <div className="flex justify-center gap-4 pt-3">
                                        <button className="bg-green-600 px-3 py-1 rounded-md">Approve</button>
                                        <button className="bg-red-600 px-3 py-1 rounded-md">Reject</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default CustomRequest;