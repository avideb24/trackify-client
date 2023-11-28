import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../components/SectionTitle";


const LimitedStock = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: assets = [], isPending } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assets');
            const thisAdminAssets = res.data.filter(asset => asset?.email === user?.email);
            const filter = thisAdminAssets.filter(asset => asset.productQuan < 10)
            return filter;
        }
    })

    // console.log(assets);

    return (
        <div className="max-w-7xl mx-auto">
            {
                isPending ?
                    <div className="text-center text-secondary">Data Loading...</div>
                    :
                    <div>
                        <SectionTitle heading={"Limited Stock Assets"}></SectionTitle>
                        <div className="flex flex-wrap gap-5 mt-3 pb-8">
                            {
                                assets?.map(asset =>
                                    <div key={asset._id} className="w-40 text-center bg-[#142849] p-6 rounded-md hover:scale-105 duration-200">
                                        {asset.productName}
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }           
        </div>
    );
};

export default LimitedStock;