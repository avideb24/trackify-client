import Swal from 'sweetalert2';
import googleLogo from '../assets/googleLogo.png';
import useAuth from '../hooks/useAuth';

const SocialLogin = () => {

    const { googleSignIn } = useAuth();

    const handleSocialLogin = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user);
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
        <div>
            <button
                onClick={handleSocialLogin}
                className="px-8 py-1 bg-blue-600 rounded-md flex justify-center items-center gap-1 mx-auto text-white"
            >
                <img className="w-8" src={googleLogo} alt="" />
                Login With Google
            </button>
        </div>
    );
};

export default SocialLogin;