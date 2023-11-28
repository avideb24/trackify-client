import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import './FormCSS.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useCheckUser from '../hooks/useCheckUser';
import googleLogo from '../assets/googleLogo.png';
import { GoogleAuthProvider } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';

const Login = () => {

    const { isAdmin, isEmployee, refetch } = useCheckUser();
    const { signInUser, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    console.log(isAdmin, isEmployee);

    const { data: allUsersData = [] } = useQuery({
        queryKey: ['allUsersData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data
        }
    })

    // console.log(allUsersData);

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(res => {
                console.log(res.user);
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log In Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });

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

    };

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin')
        }
        if (isEmployee) {
            navigate('/employee')
        }

    }, [isAdmin, isEmployee, navigate])



    const handleSocialLogin = () => {
        const provider = new GoogleAuthProvider();
        googleSignIn(provider)
            .then(res => {
                console.log(res.user);
                const currentUser = allUsersData?.find(loadedUser => loadedUser.email === res.user?.email);
                // console.log(currentUser);
                if (currentUser.role === 'admin') {
                    navigate('/admin')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log In Successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (currentUser.role === 'employee') {
                    navigate('/employee')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log In Successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (currentUser.role === 'user') {
                    navigate('/employee')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log In Successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    navigate('/')
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Please Sign Up First!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please Sign Up First!',
                })
                console.error(err)
                navigate('/')
            })
    }



    return (
        <div className="w-full h-screen flex justify-center items-center py-6">
             <Helmet>
                <title>Login</title>
            </Helmet>
            <form className="w-80 sm:w-96 mx-auto  py-16 px-8 rounded-lg form-bg" onSubmit={handleLogin}>
                <div className="gap-5">
                    <div className="w-full">
                        <label className="block mb-2">Your Email</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-2">Your Password</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="password" name="password" placeholder="Password" required />
                    </div>
                </div>
                <div className='text-center'>
                    <input type="submit" value="Log In" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
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

export default Login;