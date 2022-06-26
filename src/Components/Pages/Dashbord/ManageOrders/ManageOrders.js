import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageOrders = () => {

    const [orders, setorders] = useState([]);

    useEffect(() => {
        const url = "http://localhost:5000/allorders";
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => setorders(data))
    }, [orders])

    let allorders = []
    if (orders) {
        allorders = orders
    }

    const hendeldelete = id => {

        const procide = window.confirm("Are you Sure, You Want to Delete?")
        if (procide) {
            // console.log(id);
            const url = `http://localhost:5000/orders/${id}`
            fetch(url, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.deletedCount > 0) {
                        // console.log("deleted");
                        const restorders = orders.filter(order => order._id !== id)
                        setorders(restorders)
                    }
                })
        }
    }

    const shiftinghendel = (_id) => {
        const procide = window.confirm("Are you Sure For Shifting?")
        if (procide) {
            fetch(`http://localhost:5000/shiftorders/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }

            }).then(res => res.json())
                .then(data => {
                    toast.success("Order get to Shifting.")
                    // console.log(data);
                })
        }
    }

    // console.log(orders);
    return (
        <div>
            <h2 className='text-blue-400 text-2xl font-bold text-center mb-8'>All Cutomer Orders: <span>{orders.length}</span></h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra lg:w-full">
                    <thead>
                        <tr className=''>
                            <th className='p-3 w-24 text-xm tracking-wide'></th>
                            <th className='p-3 w-24 text-xm tracking-wide'>user Name</th>
                            <th className='p-3 w-24 text-xm tracking-wide'>Parts Name</th>
                            <th className='p-3 w-24 text-xm tracking-wide'>Quantity</th>
                            <th className='p-3 w-24 text-xm tracking-wide'>Status</th>
                            <th className='p-3 w-24 text-xm tracking-wide'>Status</th>
                            <th className='p-3 w-24 text-xm tracking-wide'>Manage</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allorders?.map((order, index) => <tr key={order._id} className='bg-slate-400'>
                                <td className='p-3 text-sm'>{index + 1}</td>
                                <td className='p-3 text-sm'>{order.name}</td>
                                <td className='p-3 w-16 text-sm'>{order.toolName}</td>
                                <td className='p-3 text-sm'>{order.quantity}</td>

                                <td className='p-3 text-sm'>

                                    {
                                        !order.paid
                                        &&

                                        <button className='btn btn-xs bg-red-400 w-16 text-xm'>UnPaid</button>


                                    }
                                    {
                                        order.paid
                                        &&
                                        <button className='btn btn-xs bg-blue-400 w-16' onClick={() => shiftinghendel(order._id)} disabled={order.shift}>Shifting</button>

                                    }

                                </td>
                                <td className='p-3 text-sm'>
                                    {
                                        order.shift
                                        &&
                                        <button className='btn btn-xs btn-accent w-16' >Deliverd</button>


                                    }
                                </td>
                                <td className='p-3 text-sm'>
                                    {
                                        !order.paid
                                        &&
                                        <button className='btn bg-red-400 btn-xs' onClick={() => hendeldelete(order._id)}>Delete</button>

                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;