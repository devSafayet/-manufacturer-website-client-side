import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Pages/Loading/Loading';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutFrom from '../CheckoutFrom/CheckoutFrom';

const stripePromise = loadStripe('pk_test_51L0VYqIjoDmdgvDrUO0C5ZUrgLT9Zdi3bmtGi5P95AABblBLQEXmfm5ME6oo9BAe3n8mpbP4pdQEFYjWaYtPF7sV00p5YqAipF');

const Payment = () => {
    const { orderid } = useParams()

    const { data: order, isLoading } = useQuery('tools', () => fetch(`https://localhost:5000/specificorders/${orderid}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    const { name, toolName, quantity, toolPrice } = order;
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left lg:mx-10">
                        <p className='text-blue-400 text-3xl'> <span className='text-black'>Hello,</span> {name}</p>
                        <p className='text-1xl text-secondary'>Your Order is almost Complete. Please Confirm your Payment</p>
                        <p className="font-bold">
                            please Pay for {quantity} price {toolName}
                        </p>
                        <p>Please Pay <span className='text-accent'>${toolPrice}</span></p>
                    </div>
                    <div className="card w-full  max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">
                            <Elements stripe={stripePromise} >
                                <CheckoutFrom order={order} />
                            </Elements>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;