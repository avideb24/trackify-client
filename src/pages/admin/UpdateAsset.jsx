import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const UpdateAsset = () => {

    const asset = useLoaderData();

    const axiosPublic = useAxiosPublic();
    const [selectedType, setSelectedType] = useState(asset.selectedType);
    const navigate = useNavigate();

    const handleSelect = (e) => {
        const select = e.target.value;
        setSelectedType(select);
    };

    const handleUpdateAsset = e => {
        e.preventDefault();
        const form = e.target;

        const currentDate = new Date().toISOString().split('T')[0];

        const productName = form.name.value;
        const productQuan = form.quantity.value;
        const upatedAsset = {productName, productQuan, selectedType, date: currentDate};
        console.log(upatedAsset);

        axiosPublic.patch(`/assets/${asset._id}`, upatedAsset)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Asset Updated Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/admin/assetList")
            }
        })

    }

    return (
        <div className="w-full h-screen flex justify-center items-center py-6">
            <form className="w-96 mx-auto  py-16 px-8 rounded-lg form-bg" onSubmit={handleUpdateAsset}>
                <div className="gap-5">
                    <div className="w-full">
                        <label className="block mb-2">Product Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="name" defaultValue={asset.productName} placeholder="Name" required />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2">Product Type</label>
                        <select onChange={handleSelect} className="select select-bordered w-full  bg-white h-5 text-primary" defaultValue={selectedType} required >
                            <option disabled value=''>Select One</option>
                            <option value={"Returnable"}>Returnable</option>
                            <option value={"Non-Returnable"}>Non-Returnable</option>
                        </select>
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-2">Product Quantity</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="number" name="quantity" defaultValue={asset.productQuan} placeholder="Quantity" required />
                    </div>
                </div>
                <div className='text-center'>
                    <input type="submit" value="Update" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
                </div>
            </form>
        </div>
    );
};

export default UpdateAsset;