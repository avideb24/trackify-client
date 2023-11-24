import { useState } from 'react';
import './FormCSS.css'
import useAxiosPublic from '../hooks/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMAGEBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinAdmin = () => {

    const axiosPubllic = useAxiosPublic();
    const [selectedPackage, setSelectedPackage] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');

    const handleSelect = e => {
        const select = e.target.value;
        setSelectedPackage(select)
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;

        const imageFormData = new FormData();
        imageFormData.append('image', form.companyLogo.files[0]); // Assuming 'companyLogo' is the name of the file input
        const imageUploadResponse = await axiosPubllic.post(image_hosting_api, imageFormData);

        // Extract the uploaded image URL
        const uploadedImageUrl = imageUploadResponse.data.data.url;
        setUploadedImage(uploadedImageUrl);

        // axiosPubllic.post(image_hosting_api)
        // .then(res => {
        //     console.log(res);
        // })

        const name = form.name.value;
        const companyName = form.companyName.value;
        const birthDate = form.date.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = { name, companyName, birthDate, email, package: selectedPackage, password, companyLogo: uploadedImageUrl };
        console.log(userInfo);
    }

    console.log(uploadedImage);

    return (
        <div className=" w-full flex justify-center items-center py-10">
            <form className="w-4/5 mx-auto  p-16 rounded-lg form-bg" onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <div className="w-1/2 mb-5">
                        <label className="block mb-2">Your Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-2">Your Date Of Birth</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="date" name="date" id="" required />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mb-5">
                        <label className="block mb-2">Your Company Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="companyName" placeholder="Company Name" required />
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-2">Your Company Logo</label>
                        <input type="file" className="file-input file-input-bordered w-full bg-white h-9 text-primary" name="companyLogo" required />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2">
                        <label className="block mb-2">Your Email</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-2">Your Password</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="password" name="password" placeholder="Password" required />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Select A Package</label>
                    <select onChange={handleSelect} className="select select-bordered w-full  bg-white h-5 text-primary" defaultValue={selectedPackage} required >
                        <option disabled value=''>Select One</option>
                        <option value='basic'>Basic</option>
                        <option value='standard'>Standard</option>
                        <option value='Premium'>Premium</option>
                    </select>
                </div>
                <div className='text-center'>
                    <input type="submit" value="Sign Up" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
                </div>
            </form>
        </div>
    );
};

export default JoinAdmin;