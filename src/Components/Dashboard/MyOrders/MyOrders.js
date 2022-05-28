import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../Firebase.init';
import DeleteOrder from '../DeleteOrder/DeleteOrder';

const MyOrders = () => {
    const [user] = useAuthState(auth);

    const [orders, setOrders] = useState([]);
    const [orderDelete, setOrderDelete] = useState(null);


    useEffect(() => {
        const url = `https://localhost:5000/orders/${user.email}`;

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
            <p className="text-3xl text-blue-400 text-center py-5">{user?.displayName} <span className='text-black'>Orders</span></p>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>user Name</th>
                            <th>Tool Name</th>
                            <th>order Quantity</th>
                            <th>Payment</th>
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

                                    {(order.toolPrice && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-success'>pay</button></Link>}

                                    {
                                        !order.paid &&
                                        <label onClick={() => setOrderDelete(order)} for="cancel-order-modal" className="btn btn-xs btn-warning">Cancel</label>

                                    }
                                </td>
                                <td>
                                    {
                                        order.transactionId
                                        &&
                                        <p className='text-blue-400'>{order.transactionId}</p>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {orderDelete && <DeleteOrder
                orderDelete={orderDelete}
                setOrderDelete={setOrderDelete}
            ></DeleteOrder>}
        </div>
    );
};

export default MyOrders;