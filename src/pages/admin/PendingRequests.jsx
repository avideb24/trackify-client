import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";


const PendingRequests = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [topRequests, setTopRequests] = useState();

    const { data: pendingRequests = [], isPending } = useQuery({
        queryKey: ['pendingRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}`);
            return res.data.slice(0, 5);
        }
    })

    const findTopRequestedAssets = (requests, limit = 4) => {
        const assetCounts = {};

        // Count the requests for each asset
        requests.forEach((request) => {
            const assetName = request.assetName;
            assetCounts[assetName] = (assetCounts[assetName] || 0) + 1;
        });

        // Convert the counts into an array of objects
        const assetCountsArray = Object.entries(assetCounts).map(([assetName, count]) => ({ assetName, count }));

        // Sort the array based on the count in descending order
        assetCountsArray.sort((a, b) => b.count - a.count);

        // Return the top requested assets
        return assetCountsArray.slice(0, limit);
    };

    // Set the top requested assets when pendingRequests data changes
    useEffect(() => {
        if (pendingRequests) {
            const topRequestedAssets = findTopRequestedAssets(pendingRequests, 4);

            // Check if topRequestedAssets is different from the current state
            if (
                !(
                    topRequestedAssets?.length === topRequests?.length &&
                    topRequestedAssets?.every((asset, index) => asset?.assetName === topRequests[index]?.assetName)
                )
            ) {
                setTopRequests(topRequestedAssets);
            }
        }
    }, [pendingRequests, topRequests]);


    return (
        <div className="max-w-7xl mx-auto py-10">
            {
                isPending ?
                    <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div>
                        <SectionTitle heading={"Pending Requests"}></SectionTitle>
                        <div className="flex flex-wrap gap-5 mt-3 pb-8">
                            {
                                pendingRequests?.map(request =>
                                    <div key={request._id} className="w-40 text-center bg-[#142849] p-6 rounded-md hover:scale-105 duration-200">
                                        {request.assetName}
                                    </div>
                                )
                            }
                        </div>
                        <SectionTitle heading={"Top Most Requested Asset"}></SectionTitle>
                        <div className="flex flex-wrap gap-5 mt-3">
                            {
                                topRequests?.map((asset, idx) =>
                                    <div key={idx} className="w-40 text-center bg-[#142849] p-6 rounded-md hover:scale-105 duration-200">
                                        {asset.assetName}
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default PendingRequests;