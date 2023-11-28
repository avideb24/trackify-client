import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const AllRequest = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requestedAsset = [], isPending } = useQuery({
        queryKey: ['requestedAsset', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}`);
            return res.data;
        }
    })

    // console.log(requestedAsset);

    const handleAccept = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Accepted!",
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
                <title>All Requests</title>
            </Helmet>
            <div className="mb-10 mt-5 flex justify-center">
                <form className="flex flex-wrap gap-5">
                    <input className="w-60 bg-[#193158] text-white px-3 py-2 rounded-md outline-none mr-4" type="text" name="text" placeholder="Search Here..." />
                    <input className="bg-secondary text-primary px-5 py-2 cursor-pointer rounded-md" type="submit" value="Search" />
                </form>
            </div>
            {
                isPending ?
                    <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div className="flex flex-wrap justify-center gap-5">
                        {
                            requestedAsset?.map(asset =>
                                <div key={asset._id} className="bg-[#132747] w-96 text-center rounded-md space-y-3 p-4">
                                    <h2>Asset: {asset.assetName}</h2>
                                    <p>Type: {asset.assetType}</p>
                                    <p>Employee Name: {asset.userName}</p>
                                    <p>Employee Email: {asset.userEmail}</p>
                                    <p>Date: {asset.date}</p>
                                    <p>Note: {asset.note}</p>
                                    <p>Status: {asset.status}</p>
                                    <div className="flex justify-center gap-4 pt-3">
                                        <button onClick={handleAccept} className="bg-green-600 px-3 py-1 rounded-md">Accept</button>
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

export default AllRequest;