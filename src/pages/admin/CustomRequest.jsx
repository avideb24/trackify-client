import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

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

    // console.log(customRequests);

    const handleApprove = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Approved!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const handleReject = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Reject"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Rejected!",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="max-w-7xl mx-auto py-10">
             <Helmet>
                <title>Custom Request</title>
            </Helmet>
            {
                isPending ?
                    <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div className="flex flex-wrap justify-center gap-5">
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
                                        <button onClick={handleApprove} className="bg-green-600 px-3 py-1 rounded-md">Approve</button>
                                        <button onClick={handleReject} className="bg-red-600 px-3 py-1 rounded-md">Reject</button>
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