import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";


const AssetList = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [filteredAssets, setFilteredAssets] = useState([]);
    // const [selectQuantity, setsetSelectQuantity] = useState(null);

    const { data: assets = [], refetch, isLoading } = useQuery({
        queryKey: ['adminAssets', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get('/assets');
            const thisAdminAssets = res.data.filter(asset => asset?.email === user?.email);
            setFilteredAssets(thisAdminAssets)
            return thisAdminAssets;
        }
    })

    const handleSelectQuantity = e => {
        const quantity = e.target.value;
        const quantityInt = parseInt(quantity);
        // console.log(quantityInt);
        // setsetSelectQuantity(quantityInt);

        const filter = assets.filter(asset => asset.productQuan === quantityInt);
        setFilteredAssets(filter)
    }

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.text.value;
        console.log(searchText);
    }

    const handleDeleteAsset = id => {
        axiosPublic.delete(`/assets/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Asset Deleted Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    console.log(filteredAssets);

    return (
        <div className="max-w-7xl mx-auto pt-6 pb-20">
             <Helmet>
                <title>Asset List</title>
            </Helmet>
            <div className="flex flex-col md:flex-row gap-5 justify-between items-center my-6">
                <div>
                    <form onSubmit={handleSearch}>
                        <input className="w-60 bg-[#193158] text-white px-3 py-2 rounded-md outline-none mr-4" type="text" name="text" placeholder="Search Here..." />
                        <input className="bg-secondary text-primary px-5 py-2 cursor-pointer rounded-md" type="submit"  value="Search" />
                    </form>
                </div>
                <select onChange={handleSelectQuantity} className="select w-40 bg-primary border-2 border-[#3d63a0] rounded-md outline-0" defaultValue={"selected"}>
                    <option disabled value={"selected"}>Select Quantity</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
            </div>
            <div>
                {
                    isLoading ?
                        <div className="text-center">
                            Data Loading...
                        </div>
                        :
                        <div className="flex flex-wrap justify-center gap-4 py-6">
                            {
                                filteredAssets?.map(asset =>
                                    <div key={asset._id} className="w-60 flex flex-col p-4 bg-[#132747] text-white rounded-md text-center space-y-3">
                                        <h2>Name: {asset.productName}</h2>
                                        <p>Quantity: {asset.productQuan}</p>
                                        <p>Category: {asset.selectedType}</p>
                                        <div className="flex justify-center gap-6 pt-3">
                                            <Link to={`/admin/updateAsset/${asset._id}`}>
                                                <button  className="text-xl bg-secondary text-primary p-2 rounded-md"><FaPen></FaPen></button>
                                            </Link>

                                            <button onClick={() => handleDeleteAsset(asset._id)} className="text-xl bg-secondary text-primary p-2 rounded-md"><FaTrashAlt ></FaTrashAlt></button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default AssetList;


