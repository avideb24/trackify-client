import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useCheckUser from "../../hooks/useCheckUser";
import Swal from "sweetalert2";


const RequestAsset = () => {

    const { user } = useAuth();
    const { userData } = useCheckUser();
    const axiosPublic = useAxiosPublic();

    const { data: assetsList = [], refetch, isPending } = useQuery({
        queryKey: ['assetsList'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assets');
            return res.data;
        }
    })

    const { data: adminEmail = '' } = useQuery({
        queryKey: ['adminEmail', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teams/${user.email}`);
            const admin = res.data.find(user => user.role === 'admin');
            return admin.email;
        }
    })


    const handleSelectQuantity = e => {
        const quantity = e.target.value;
        const quantityInt = parseInt(quantity);
        console.log(quantityInt);
    }

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.text.value;
        console.log(searchText);
    }

    const handleRequestAsset = (e, assetName, assetType) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');

        const note = e.target.text.value;
        const requestInfo = { userName: userData.name, userEmail: userData.email, adminEmail, note, assetName, assetType, date: formattedDate, status: 'pending' };
        // console.log(requestInfo);

        axiosPublic.post('/requests', requestInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Send Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }


    return (
        <div className="max-w-7xl mx-auto pt-10 pb-40">
            <div className="flex gap-5 justify-between my-6">
                <div>
                    <form onSubmit={handleSearch}>
                        <input className="w-60 bg-[#193158] text-white px-3 py-2 rounded-md outline-none mr-4" type="text" name="text" placeholder="Search Here..." />
                        <input className="bg-secondary text-primary px-5 py-2 cursor-pointer rounded-md" type="submit" value="Search" />
                    </form>
                </div>
                <select onChange={handleSelectQuantity} className="select w-40 bg-primary border-2 border-[#3d63a0] rounded-md outline-0" defaultValue={"selected"}>
                    <option disabled value={"selected"}>Select Quantity</option>
                    <option value={"Returnable"}>Returnable</option>
                    <option value={"Non-Returnable"}>Non-Returnable</option>
                </select>
            </div>
            <div>
                {
                    isPending ?
                    <div className="text-center text-secondary py-6">Data Loading...</div>
                        :
                        <div className="flex flex-wrap gap-4">
                            {
                                assetsList?.map(asset =>
                                    <div key={asset._id} className="w-60 flex flex-col p-4 bg-[#132747] text-white rounded-md text-center space-y-3">
                                        <h2>Name: {asset.productName}</h2>
                                        <p>Quantity: {asset.productQuan}</p>
                                        <p>Type: {asset.selectedType}</p>
                                        <div>
                                            <button className="bg-secondary text-primary py-1 px-5 rounded-md" onClick={() => document.getElementById('my_modal_3').showModal()}>Request</button>
                                            <dialog id="my_modal_3" className="modal">
                                                <div className="modal-box bg-primary border-2">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <form onSubmit={(e) => handleRequestAsset(e, asset.productName, asset.selectedType)} className="flex flex-col justify-center my-6 gap-8">
                                                        <textarea className="rounded-md bg-white text-primary p-2 h-30 outline-none resize-none" name="text" placeholder="Notes..."></textarea >
                                                        <input type="submit" className="bg-secondary text-primary py-1 px-5 rounded-md cursor-pointer w-32 mx-auto" value="Request" />
                                                    </form>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default RequestAsset;