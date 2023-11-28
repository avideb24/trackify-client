import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle";


const PendingAssets = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: pendingAssets = [], isPending } = useQuery({
        queryKey: ['pendingAssets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/employee/${user.email}`);
            return res.data;
        }
    })

    // console.log(pendingAssets);

    return (
        <div className="py-10">      
            {
                isPending ?
                    <div className="text-center text-secondary py-6">Data Loading...</div>
                    :
                    <div>
                        <div>
                            <SectionTitle heading={"My Pending Assets"}></SectionTitle>
                            <div className="mt-5">
                                {
                                    pendingAssets?.length === 0 ? <div className="text-center">No Data</div> :
                                        <div className="flex flex-wrap gap-5 ">
                                            {
                                                pendingAssets?.map(asset =>
                                                    <div key={asset._id} className="w-40 text-center p-3 bg-[#162d52] rounded-md">
                                                        <p>{asset.assetName}</p>
                                                        <p className="text-sm">{asset.assetType}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="mt-10">
                            <SectionTitle heading={"My Monthly Requests"}></SectionTitle>
                            <div className="mt-5">
                                {
                                    pendingAssets?.length === 0 ? <div className="text-center">No Data</div> :
                                        <div className="flex flex-wrap gap-5 ">
                                            {
                                                pendingAssets?.map(asset =>
                                                    <div key={asset._id} className="w-40 text-center p-3 bg-[#162d52] rounded-md">
                                                        <p>{asset.assetName}</p>
                                                        <p className="text-sm">{asset.assetType}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default PendingAssets;