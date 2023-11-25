import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API);

const Payment = () => {

    const getItem = useParams();
    const price = parseInt(getItem.price)

    console.log(price);

    return (
        <div className="w-full flex justify-center items-center py-6">
            <div className="w-4/5 mx-auto bg-[#132644] py-16 px-8 rounded-lg">
                <Elements stripe={stripePromise}>
                    <CheckOutForm price={price}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;