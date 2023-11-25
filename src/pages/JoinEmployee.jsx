import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import './FormCSS.css'
import SocialLogin from '../components/SocialLogin';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const JoinEmployee = () => {

    const { signUpUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const birthDate = form.date.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = { name, birthDate, email, role: 'user'};
        // console.log(userInfo);

        signUpUser(email, password)
            .then(res => {
                console.log(res.user);

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if(res.data.insertedId){
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

    }

    return (
        <div className="w-full h-screen flex justify-center items-center py-6">
            <form className="w-4/5 mx-auto  p-16 rounded-lg form-bg" onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <div className="w-1/2 mb-8">
                        <label className="block mb-2">Your Name</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-2">Your Date Of Birth</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="date" name="date" id="" required />
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
                <div className='text-center'>
                    <input type="submit" value="Sign Up" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
                </div>
                <div className='mt-10 text-center'>
                    <SocialLogin></SocialLogin>
                </div>
            </form>
        </div>
    );
};

export default JoinEmployee;