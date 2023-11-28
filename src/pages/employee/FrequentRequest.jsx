import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle";

const FrequentRequest = () => {


    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: frequestRequests = [], isPending } = useQuery({
        queryKey: ['frequestRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/employee/${user.email}`);
            return res.data;
        }
    })

    for (let i = frequestRequests.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [frequestRequests[i], frequestRequests[j]] = [
            frequestRequests[j],
            frequestRequests[i],
        ];
    }

    // console.log(frequestRequests);

    return (
        <div>
            {
                isPending ? <div className="text-center text-secondary py-6">Data Loading...</div> :
                    <div>
                        <SectionTitle heading={"Frequest Requests"}></SectionTitle>
                        <div className="mt-5">
                            {
                                frequestRequests?.length === 0 ? <div className="text-center">No Data</div> :
                                    <div className="flex flex-wrap gap-5 ">
                                        {
                                            frequestRequests?.map(request =>
                                                <div key={request._id} className="w-40 text-center p-3 bg-[#162d52] rounded-md">
                                                    <p>{request.assetName}</p>
                                                    <p className="text-sm">{request.assetType}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default FrequentRequest;