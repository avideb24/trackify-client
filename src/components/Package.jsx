import { Link } from "react-router-dom";
import Button from "./Button";
import SectionTitle from "./SectionTitle";
import useAuth from "../hooks/useAuth";


const Package = () => {

    const { user } = useAuth();

    const packages = [
        {
            id: 1,
            name: 'basic',
            title: 'Maximum 5 employees',
            description: 'Ideal for small teams',
            price: 5,
        },
        {
            id: 2,
            name: 'standard',
            title: 'Maximum 10 employees',
            description: 'Suitable for growing teams',
            price: 8,
        },
        {
            id: 3,
            name: 'premium',
            title: 'Maximum 20 employees',
            description: 'Perfect for larger teams',
            price: 15,
        },
    ];


    return (
        <div className="max-w-7xl mx-auto py-10">
            <SectionTitle heading="Our Packages"></SectionTitle>
            <div className="flex justify-center items-center gap-5">
                {
                    packages.map(item =>
                        <div key={item.id} className='text-center w-80 p-8 bg-[#091f4c] rounded-md mt-10 space-y-4 flex flex-col justify-between'>
                            <h3 className='text-xl text-[#08133a] font-bold p-4 rounded-tl-full rounded-br-full bg-secondary uppercase'>{item.name}</h3>
                            <h2 className='text-5xl text-secondary font-bold'>${item.price}</h2>
                            <p className='text-sm pb-2'>{item.title}</p>
                            <div className='w-32 h-1 mx-auto bg-secondary'></div>

                            {
                                user ?
                                    <Link to={`/admin/payment/${item.price}`}>
                                        <Button text="Purchase"></Button>
                                    </Link>
                                    : ''
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Package;