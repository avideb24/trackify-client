import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useCheckUser from "../hooks/useCheckUser";


const UpdateUser = () => {

    const { isAdmin, isEmployee } = useCheckUser();
    const user = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleUpdateUser = e => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const birthDate = form.date.value;

        const updatedInfo = { name, birthDate };
        axiosPublic.patch(`/users/${user._id}`, updatedInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Info Updated Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    if (isAdmin) {
                        navigate("/admin")
                    }
                    if (isEmployee) {
                        navigate("/employee")
                    }
                }
            })

    }

    return (
        <div>
            <div className="w-full h-screen flex justify-center items-center py-6">
                <form className="w-96 mx-auto  py-16 px-8 rounded-lg form-bg" onSubmit={handleUpdateUser}>
                    <div className="gap-5">
                        <div className="w-full">
                            <label className="block mb-2">Your Name</label>
                            <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="text" name="name" defaultValue={user.name} placeholder="Name" required />
                        </div>
                        <div className="w-full mt-5">
                            <label className="block mb-2">Your Date Of Birth</label>
                            <input className="w-full h-9 px-2 outline-none rounded-lg bg-white text-primary" type="date" name="date" defaultValue={user.birthDate} id="" required />
                        </div>
                    </div>
                    <div className='text-center'>
                        <input type="submit" value="Update" className="bg-secondary py-2 px-8 text-primary font-bold mt-10 cursor-pointer rounded-lg" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;