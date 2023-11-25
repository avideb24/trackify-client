// import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";


const AddEmployee = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const [totalAssets, setTotalAssets] = useState([]);

    // const { data: totalAssets = [] } = useQuery({
    //     queryKey: ['totalAssets'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/assets');
    //         const myAssets = res.data.filter(asset => asset.email === user.email);
    //         return myAssets;
    //     }
    // })

    useEffect(() => {
        axiosPublic.get('/assets')
            .then(res => {
                const myAssets = res.data.filter(asset => asset.email === user?.email);
                setTotalAssets(myAssets)
            })
    }, [axiosPublic, user?.email])

    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="text-xl max-w-xl mx-auto flex justify-between items-center">
                <h2>Total Assets: {totalAssets?.length}</h2>
                <h2>Package Limit: 10</h2>
                <Link to="/admin/package">
                    <Button text={"Increase Limit"}></Button>
                </Link>
            </div>
        </div>
    );
};

export default AddEmployee;