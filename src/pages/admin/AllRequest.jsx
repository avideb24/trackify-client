import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


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

    console.log(requestedAsset);

    return (
        <div className="max-w-7xl mx-auto py-10">
            {
                isPending ?
                    <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className="text-secondary">
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Requester Name</th>
                                        <th>Requester Email</th>
                                        <th>Date</th>
                                        <th>Note</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        requestedAsset?.map(asset =>
                                            <tr key={asset._id} className="bg-primary text-white">
                                                <th>{asset.assetName}</th>
                                                <td>{asset.assetType}</td>
                                                <td>{asset.userName}</td>
                                                <td>{asset.userEmail}</td>
                                                <td>{asset.date}</td>
                                                <td>{asset.note}</td>
                                                <td>{asset.status}</td>
                                                <td>
                                                    <button>Accept</button>
                                                </td>
                                                <td>
                                                    <button>Reject</button>
                                                </td>

                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default AllRequest;