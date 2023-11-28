import { useState } from 'react';
import './FormCSS.css'
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const image_hosting_key = import.meta.env.VITE_IMAGEBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinAdmin = () => {

    const { signUpUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [selectedPackage, setSelectedPackage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSelect = (e) => {
        const select = e.target.value;
        setSelectedPackage(select);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        try {
            setLoading(true);

            const imageFormData = new FormData();
            imageFormData.append('image', form.companyLogo.files[0]);
            const imageUploadResponse = await axiosPublic.post(image_hosting_api, imageFormData);

            const uploadedImageUrl = imageUploadResponse.data.data.url;

            const name = form.name.value;
            const companyName = form.companyName.value;
            const birthDate = form.date.value;
            const email = form.email.value;
            const password = form.password.value;

            const userInfo = { name, companyName, birthDate, email, package: selectedPackage, companyLogo: uploadedImageUrl, role: 'admin' };

            // Sign up the user using async/await
            await signUpUser(email, password);
            form.reset();
            setLoading(false);

            axiosPublic.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Sign Up Successful!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/admin/payment/5')
                    }
                })

        } catch (error) {
            setLoading(false);
            console.error('Error during signup:', error);

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    console.log(loading);

    return (
        <div className=" w-full flex justify-center items-center py-10">
            <form className="w-4/5 mx-auto p-6 md:p-16 rounded-lg form-bg" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2 md:mb-5">
                        <label className="block mb-2">Your Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className="w-full md:w-1/2 mb-5 md:mb-0">
                        <label className="block mb-2">Your Date Of Birth</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="date" name="date" id="" required />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2 md:mb-5">
                        <label className="block mb-2">Your Company Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="companyName" placeholder="Company Name" required />
                    </div>
                    <div className="w-full md:w-1/2 mb-5 md:mb-0">
                        <label className="block mb-2">Your Company Logo</label>
                        <input type="file" className="file-input file-input-bordered w-full bg-white h-9 text-primary" name="companyLogo" required />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2">
                        <label className="block mb-2">Your Email</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block mb-2">Your Password</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="password" name="password" placeholder="Password" required />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Select A Package</label>
                    <select onChange={handleSelect} className="select select-bordered w-full  bg-white h-5 text-primary" defaultValue={selectedPackage} required >
                        <option disabled value=''>Select One</option>
                        <option value={5}>Basic</option>
                        <option value={8}>Standard</option>
                        <option value={15}>Premium</option>
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