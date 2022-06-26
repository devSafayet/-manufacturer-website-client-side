import React from 'react';
import { useQuery } from 'react-query';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import { Elements } from '@stripe/react-stripe-js';

import ChackoutFrom from '../ChackoutFrom/ChackoutFrom';


const stripePromise = loadStripe('pk_test_51LCR3OKUc7LWekh1DJkjI0mAsvh6qx8uqm5DZYce2eq0iL46ikDv16Zyo7ZUxjkks3IZvlM8QGwREmj8pg6d9u9V00JL3iBwk2');


const Payment = () => {

    const { orderid } = useParams()

    const { data: order, isLoading } = useQuery('tools', () => fetch(`http://localhost:5000/specificorders/${orderid}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    const { name, toolName, quantity, toolPrice } = order;

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left lg:mx-10">
                        <p className='text-blue-400 text-2xl'>Hello, <span className='text-yellow-400 font-bold'>"{name}"</span></p>
                        <br />
                        <p className='text-1xl text-red-400'>Your Order is almost Done, Please Confirm your Payment.</p>
                        <br />
                        <p className="font-bold">
                            Please PAY For <span className='text-blue-400'>{quantity}</span> Pease.
                            Your Parts Name: <span className='text-blue-400'>{toolName}</span>
                        </p>
                        <br />
                        <p>Please Pay <span className='text-red-400'>${toolPrice}</span></p>
                    </div>
                    <div className="card w-full  max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">
                            <Elements stripe={stripePromise} >
                                <ChackoutFrom order={order} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;