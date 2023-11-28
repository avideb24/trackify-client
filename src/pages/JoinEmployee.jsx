import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import './FormCSS.css'
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import googleLogo from '../assets/googleLogo.png'
import { GoogleAuthProvider } from 'firebase/auth';

const image_hosting_key = import.meta.env.VITE_IMAGEBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinEmployee = () => {

    const { signUpUser, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        try {
            const imageFormData = new FormData();
            imageFormData.append('image', form.image.files[0]);
            const imageUploadResponse = await axiosPublic.post(image_hosting_api, imageFormData);

            const uploadedImageUrl = imageUploadResponse.data.data.url;

            const name = form.name.value;
            const birthDate = form.date.value;
            const email = form.email.value;
            const password = form.password.value;

            const userInfo = { name, birthDate, email, image: uploadedImageUrl, role: 'user' };
            // console.log(userInfo);

            signUpUser(email, password)
                .then(res => {
                    console.log(res.user);

                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Sign In Successfully!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/employee')
                            }
                        })
                        .catch(error => console.log(error))
                })

                .catch(err => {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Something Wrong!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.error(err)
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
    }

    console.log(loading);

    const handleSocialLogin = () => {
        const provider = new GoogleAuthProvider();

        googleSignIn(provider)
            .then(res => {
                if (res.user) {
                    const name = res.user.displayName;
                    const birthDate = '';
                    const email = res.user.email;
                    const image = res.user.photoURL;
                    const userInfo = {name, birthDate, email, image, role: 'user'}

                    console.log(userInfo);
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Sign In Successfully!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/employee')
                            }
                        })
                        .catch(error => console.log(error))

                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Something Wrong!',
                })
                console.error(err)
            })
    }



    return (
        <div className="w-full flex justify-center items-center pt-8 pb-16">
            <form className="w-4/5 mx-auto  p-16 rounded-lg form-bg" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2 md:mb-8">
                        <label className="block mb-2">Your Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block mb-2">Your Date Of Birth</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="date" name="date" id="" required />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5 mt-5 md:mt-0">
                    <div className="w-full md:w-1/2">
                        <label className="block mb-2">Your Email</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block mb-2">Your Password</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="password" name="password" placeholder="Password" required />
                    </div>
                </div>
                <div className="w-full mt-8">
                    <label className="block mb-2">Upload Your Image</label>
                    <input type="file" className="file-input file-input-bordered w-full bg-white h-9 text-primary" name="image" required />
                </div>
                <div className='text-center'>
                    <input type="submit" value="Sign Up" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
                </div>
                <div className='mt-10 text-center'>
                    <button
                        onClick={handleSocialLogin}
                        className="px-8 py-1 bg-blue-600 rounded-md flex justify-center items-center gap-1 mx-auto text-white"
                    >
                        <img className="w-8" src={googleLogo} alt="" />
                        Login With Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JoinEmployee;