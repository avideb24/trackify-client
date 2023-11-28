import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Swal from "sweetalert2";


const CheckOutForm = ({ price }) => {

    // console.log(price);
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.post("/create-payment-intent", { price })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosPublic, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email
                },
            },
        },
        );

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            setTransactionId(paymentIntent.id)
            if (paymentIntent.status == 'succeeded') {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

    return (
        <form onSubmit={handleSubmit} className="text-white">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#fff',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret} className="mt-5 bg-secondary cursor-pointer py-1 px-5 text-primary rounded-md">
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && 
            <div>
                <p className="text-green-600 text-md font-bold mt-2">Transaction Id: {transactionId}</p>
                <div className="inline-block mt-10">
                <Link to='/admin'>
                    <Button text="Go Home"></Button>
                </Link>
            </div>
            </div>
            }          
        </form>
    );
};

export default CheckOutForm;