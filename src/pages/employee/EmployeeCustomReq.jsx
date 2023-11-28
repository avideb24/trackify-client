import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGEBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EmployeeCustomReq = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [selectedType, setSelectedType] = useState('');
    const navigate = useNavigate();

    const { data: adminEmail = '' } = useQuery({
        queryKey: ['adminEmailCustom', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teams/${user.email}`);
            const admin = res.data.find(user => user.role === 'admin');
            return admin.email;
        }
    })

    const handleSelect = e => {
        const select = e.target.value;
        setSelectedType(select);
    };

    const handleAddCustomAsset = async (e) => {
        e.preventDefault();
        const form = e.target;

        const imageFormData = new FormData();
        imageFormData.append('image', form.image.files[0]);
        const imageUploadResponse = await axiosPublic.post(image_hosting_api, imageFormData);

        const uploadedImageUrl = imageUploadResponse.data.data.url;

        const name = form.name.value;
        const price = form.price.value;
        const need = form.need.value;
        const info = form.info.value;

        const customRequest = { name, price, need, info, userEmail: user.email, adminEmail, type: selectedType, image: uploadedImageUrl };
        console.log(customRequest);
        await axiosPublic.post('/customRequests', customRequest)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Send Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/employee')
                    form.reset();
                }
            })

    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            <Helmet>
                <title>Custom Asset Request</title>
            </Helmet>
            <form className="w-full sm:w-96 mx-auto p-5 sm:py-16 sm:px-8 rounded-lg form-bg" onSubmit={handleAddCustomAsset}>
                <div className="gap-5">
                    <div className="w-full">
                        <label className="block mb-2">Asset Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-2">Asset Price</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="number" name="price" placeholder="Price" required />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2">Asset Type</label>
                        <select onChange={handleSelect} className="select select-bordered w-full  bg-white h-5 text-primary" defaultValue={selectedType} required >
                            <option disabled value=''>Select One</option>
                            <option value={"Returnable"}>Returnable</option>
                            <option value={"Non-Returnable"}>Non-Returnable</option>
                        </select>
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-2">Asset Image</label>
                        <input type="file" className="file-input file-input-bordered w-full bg-white h-9 text-primary" name="image" required />
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-2">Asset Need</label>
                        <textarea name="need" className="bg-white text-primary resize-none w-full h-20 rounded-md p-3 outline-none" placeholder="Why You Need This?" required></textarea>
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-2">Additional Information</label>
                        <textarea name="info" className="bg-white text-primary resize-none w-full h-20 rounded-md p-3 outline-none" placeholder="Info About Asset" required></textarea>
                    </div>
                </div>
                <div className='text-center'>
                    <input type="submit" value="Request" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
                </div>
            </form>
        </div>
    );
};

export default EmployeeCustomReq;