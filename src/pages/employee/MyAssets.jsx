import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyAssets = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myAssets = [], isPending } = useQuery({
        queryKey: ['myAssets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/employee/${user.email}`);
            return res.data;
        }
    })

    // console.log(myAssets);

    return (
        <div className="max-w-7xl mx-auto py-10">
            {
                isPending ?
                    <div className="text-center text-secondary py-6">Data Loading...</div>
                    :
                    <div>
                        {
                            myAssets.length === 0 ?
                                <div className="text-center text-secondary py-6">No Data</div>
                                :
                                <div className="flex flex-wrap gap-5 py-6">
                                    {
                                        myAssets?.map(asset =>
                                            <div key={asset._id} className="bg-[#132747] w-96 text-center rounded-md space-y-3 p-4">
                                                <h2>Name: {asset.assetName}</h2>
                                                <p>Type: {asset.assetType}</p>
                                                <p>Requested Date: {asset.date}</p>
                                                <p>Approval Date: </p>
                                                <p>Status: {asset.status}</p>
                                                <div className="flex justify-center gap-4 pt-3">
                                                    {
                                                        asset.status === 'pending' && <button className="bg-red-600 px-3 py-1 rounded-md">Cancel</button>
                                                    }
                                                    {
                                                        asset.status === 'approved' && <button className="bg-red-600 px-3 py-1 rounded-md">Print</button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default MyAssets;