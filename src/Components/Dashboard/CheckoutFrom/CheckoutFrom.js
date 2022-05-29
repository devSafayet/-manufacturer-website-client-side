import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutFrom = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionID, setTransactonID] = useState('');

    const [clientSecret, setClientSecret] = useState('');
    const { _id, toolPrice, name, toolName, email } = order;
    console.log(toolPrice);
    // console.log(order);
    const price = Number(toolPrice)

    useEffect(() => {
        fetch('https://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        setCardError(error?.message || "")
        setSuccess('')
        setProcessing(true)

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: toolName,
                        email: email
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message)
            setSuccess('')
            setProcessing(false)
        }
        else {
            setCardError('')
            setTransactonID(paymentIntent.id)
            console.log(paymentIntent);
            setSuccess('Your Payment is Completed.')

            //send payment to database
            const payment = {
                order: _id,
                transactionID: paymentIntent.id,
            }

            fetch(`https://localhost:5000/orders/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)

            }).then(res => res.json())
                .then(data => {
                    setProcessing(false)
                    console.log(data);
                    toast.success("Payment Success.")
                })
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
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
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || success}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                transactionID && <p className='text-green-500'>TransactionID: {transactionID}</p>
            }
        </div>
    );
};

export default CheckoutFrom;