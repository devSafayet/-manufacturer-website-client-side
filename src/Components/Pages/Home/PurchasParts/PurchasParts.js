import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../Firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import { CgShoppingBag } from "@react-icons/all-files/cg/CgShoppingBag";

const PurchasParts = () => {
    const [user] = useAuthState(auth)
    const { id } = useParams()
    const NameRef = useRef('');
    const EmailRef = useRef('');
    const QuantityRef = useRef('');
    const LocationRef = useRef('');
    const PhoneRef = useRef('');
    const [error, setError] = useState(null)

    const { data: tool, isLoading, refetch } = useQuery('tool', () => fetch(`http://localhost:5000/products/${id}`).then(res => res.json()));

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

        // console.log(bookingDetails);

        if (newQuantity < minimum) {
            setError(`Please Order More Then ${minimum} Peace`)
            return
        }
        if (newQuantity > updatequantity) {
            setError(`${newQuantity} Peace is Not Available`)
            return
        }
        else {
            // update quantity 

            updatequantity = updatequantity - newQuantity
            const quantity = { updatequantity }

            // console.log(quantity)

            const url = `http://localhost:5000/products/${id}`
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

            fetch('http://localhost:5000/orders', {
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
                        toast.success(`Thank You!! Your Order is Wait For Payment.`)
                    }
                    event.target.reset()
                    refetch()
                })
        }
    }
    return (
        <div className='flex justify-center items-center lg:my-10'>
            <div className="card text-center card-compact w-96 bg-base-200 shadow-xl">
                <figure><img src={tool.img} alt="" className='rounded w-full' /></figure>
                <div className="card-body text-center">
                    <h2 className="card-title text-blue-400 text-center items-center">{tool.name}</h2>
                    <p>{tool.decreption}</p>
                    <p className='text-red-600 text-2xl'>Price :{tool.price}</p>
                    <p>Available: {tool?.quantity} Peace</p>
                    <form onSubmit={heldelBuy}>
                        <input type="text" name='name' ref={NameRef} placeholder="User Name" className="input input-bordered  text-center max-w-xs my-3" value={user.displayName} disabled />

                        <input type="text" name='email' ref={EmailRef} placeholder="User Email" className="input input-bordered max-w-xs my-3 text-center" value={user.email} disabled /> <br />

                        <label className='text-primary'>Add Order Quantity</label>
                        <input type="text" name='quantity' defaultValue={minimum} ref={QuantityRef} placeholder={`Enter buying Quantity more then ${minimum} Peace`} className="input input-bordered w-full max-w-xs my-3" required />

                        <p className="text-red-500 font-bold">{error}</p>

                        <label className='text-primary'>Add Order Location</label>
                        <input type="text" name='location' ref={LocationRef} placeholder="Add Location" className="input input-bordered w-full max-w-xs my-3" required />

                        <br />
                        <label className='text-primary'>Add You Number</label>
                        <input type="text" name='phone' ref={PhoneRef} placeholder="Phone Number" className="input input-bordered w-full max-w-xs my-3" required />

                        <div className="card-actions justify-center">
                            {(Number(tool?.quantity) < minimum)
                                ?
                                <Link to='/' className="btn btn-primary" >Out Of Stock</Link>
                                :
                                <button className="btn bg-blue-400" >Confirm Order <span className='ml-2 text-2xl text-white'> <CgShoppingBag /></span></button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchasParts;