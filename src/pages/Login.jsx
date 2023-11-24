import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import './FormCSS.css'
import SocialLogin from '../components/SocialLogin';

const Login = () => {

    const {signInUser} = useAuth();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
        .then(res => {
            console.log(res.user);
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Login Credentials!',
            })
            console.error(err)
        })

    }

    return (
        <div className="w-full h-screen flex justify-center items-center py-6">
            <form className="w-96 mx-auto  py-16 px-8 rounded-lg form-bg" onSubmit={handleLogin}>
                <div className="gap-5">
                    <div className="w-full">
                        <label className="block mb-2">Your Email</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="email" name="email" placeholder="Email" required/>
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-2">Your Password</label>
                        <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="password" name="password" placeholder="Password" required/>
                    </div>
                </div>
                <div className='text-center'>
                    <input type="submit" value="Log In" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
                </div>
                <div className='mt-10 text-center'>
                    <SocialLogin></SocialLogin>
                </div>
            </form>
        </div>
    );
};

export default Login;