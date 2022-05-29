import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../Firebase.init';
import Loading from '../../Pages/Loading/Loading';

const PurchaseTools = () => {
    const [user] = useAuthState(auth)
    const { id } = useParams()
    const NameRef = useRef('');
    const EmailRef = useRef('');
    const QuantityRef = useRef('');
    const LocationRef = useRef('');
    const PhoneRef = useRef('');
    const [error, setError] = useState(null)

    const { data: tool, isLoading, refetch } = useQuery('tool', () => fetch(`https://localhost:5000/products/${id}`).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    let updatequantity = Number(tool?.quantity);
    const minimum = Number(tool?.minimum)

    console.log(minimum);

    const heldelBuy = (event) => {
        event.preventDefault()
        const name = NameRef.current.value;
        const email = EmailRef.current.value;
        const quantity = QuantityRef.current.value;
        const location = LocationRef.current.value;
        const phone = PhoneRef.current.value;


        const newQuantity = Number(quantity)

        const bookingDetails = {
            toolName: tool.name,
            toolPrice: tool.price,
            name: name,
            email: email,
            quantity: quantity,
            location: location,
            phone: phone
        }

        console.log(bookingDetails);

        if (newQuantity < minimum) {
            setError(`Please Order more then ${minimum} price`)
            return
        }
        if (newQuantity > updatequantity) {
            setError(`${newQuantity} price is not available`)
            return
        }
        else {
            // update quantity 
            updatequantity = updatequantity - newQuantity

            const quantity = { updatequantity }

            // console.log(quantity);

            const url = `https://localhost:5000/products/${id}`
            // console.log(url);
            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(quantity)

            })
                .then(res => res.json())
                .then(data => {
                    refetch()
                })

            // post order

            fetch('https://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(bookingDetails)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if (data.insertedId) {
                        toast.success(`Your Order is wait for Payment`)
                    }
                    event.target.reset()
                    refetch()
                })
        }
    }
    return (
        <div className='flex justify-center items-center lg:my-10'>
            <div className="card card-compact w-96 bg-white shadow-xl bg-blue-200">
                <figure><img src={tool.img} alt="tools" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{tool.name}</h2>
                    <p>{tool.decreption}</p>
                    <p>Price :{tool.price}</p>
                    <p>Available :{tool?.quantity} Pices</p>
                    <form onSubmit={heldelBuy}>
                        <input type="text" name='name' ref={NameRef} placeholder="User Name" className="input input-bordered w-full max-w-xs my-3" value={user.displayName} disabled />

                        <input type="text" name='email' ref={EmailRef} placeholder="user email" className="input input-bordered w-full max-w-xs my-3" value={user.email} disabled /><br />

                        <label className='text-secondary'>Add Order Quantity</label>
                        <input type="text" name='quantity' defaultValue={minimum} ref={QuantityRef} placeholder={`Enter buying Quantity more then ${minimum} pices`} className="input input-bordered w-full max-w-xs my-3" required />

                        <p className="text-red-500 font-bold">{error}</p>

                        <label className='text-secondary'>Add Order Location</label>
                        <input type="text" name='location' ref={LocationRef} placeholder="Add Location" className="input input-bordered w-full max-w-xs my-3" required />

                        <br />
                        <label className='text-secondary'>Add You Contact</label>
                        <input type="text" name='phone' ref={PhoneRef} placeholder="Phone Number" className="input input-bordered w-full max-w-xs my-3" required />

                        <div className="card-actions justify-center">
                            {(Number(tool?.quantity) < minimum)
                                ?
                                <Link to='/' className="btn btn-warning" >Out of Stoke</Link>
                                :
                                <button className="btn btn-primary" >Confirm Order <span className='ml-2 text-2xl text-blue-400'> </span></button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchaseTools;