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
            <div className="mb-10 mt-5 flex justify-center">
                <form>
                    <input className="w-60 bg-[#193158] text-white px-3 py-2 rounded-md outline-none mr-4" type="text" name="text" placeholder="Search Here..." />
                    <input className="bg-secondary text-primary px-5 py-2 cursor-pointer rounded-md" type="submit" value="Search" />
                </form>
            </div>
            {
                isPending ?
                    <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div className="flex flex-wrap gap-5">
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
                                        <button className="bg-green-600 px-3 py-1 rounded-md">Accept</button>
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

export default AllRequest;