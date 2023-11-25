import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const AssetList = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: assets = [], refetch } = useQuery({
        queryKey: ['adminAssets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assets');
            const thisAdminAssets = res.data.filter(asset => asset?.email === user?.email);
            return thisAdminAssets;
        }
    })


    const handleDeleteAsset = id => {
        axiosPublic.delete(`/assets/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Asset Added Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    return (
        <div className="max-w-7xl mx-auto py-6">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-secondary text-md">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assets?.map((asset, idx) =>
                                <tr key={asset._id}>
                                    <th>{idx + 1}</th>
                                    <td>{asset.productName}</td>
                                    <td>{asset.selectedType}</td>
                                    <td>{asset.productQuan}</td>
                                    <td>{asset.date}</td>
                                    <td>
                                        <Link to={`/admin/updateAsset/${asset._id}`}>
                                            <button className="text-xl bg-secondary text-primary p-2 rounded-md"><FaPen></FaPen></button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteAsset(asset._id)} className="text-xl bg-secondary text-primary p-2 rounded-md"><FaTrashAlt ></FaTrashAlt></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;