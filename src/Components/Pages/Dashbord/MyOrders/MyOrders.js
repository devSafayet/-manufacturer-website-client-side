import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../../Firebase.init';
import DeleteOrderModal from '../DeleteOrderModal/DeleteOrderModal'

const MyOrders = () => {

    const [user] = useAuthState(auth)
    const [orders, setOrders] = useState([])
    const [orderDelete, setOrderDelete] = useState(null)


    useEffect(() => {
        const url = `http://localhost:5000/orders/${user.email}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [orders])



    return (
        <div>
            <p className="text-3xl text-blue-400 text-center py-5"><span className='text-yellow-400'>
                "{user?.displayName}"</span> Orders</p>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>Parts Name</th>
                            <th>Order Quantity</th>
                            <th>Payment</th>
                            <th>Order Cancel</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders?.map((order, index) => <tr key={order._id} className='bg-slate-400'>
                                <td>{index + 1}</td>
                                <td>{order.name}</td>
                                <td>{order.toolName}</td>
                                <td>{order.quantity}</td>
                                <td>

                                    {(order.toolPrice && !order.paid) && <Link to={`/dashbord/payment/${order._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}


                                </td>
                                <td>
                                    {
                                        !order.paid &&
                                        <label onClick={() => setOrderDelete(order)} for="cencel-order-modal" className="btn btn-xs bg-red-400">Cancel</label>

                                    }
                                </td>
                                <td>
                                    {
                                        order.transactionId
                                        &&
                                        <p className='text-blue-700'>{order.transactionId}</p>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {orderDelete && <DeleteOrderModal
                orderDelete={orderDelete}
                setOrderDelete={setOrderDelete}
            ></DeleteOrderModal>}
        </div>
    );
};

export default MyOrders;