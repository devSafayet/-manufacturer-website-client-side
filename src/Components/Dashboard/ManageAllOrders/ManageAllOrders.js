import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageAllOrders = () => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const url = "https://localhost:5000/allorders";

        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [orders])

    let allorders = []
    if (orders) {
        allorders = orders
    }

    const handeldelete = id => {

        const procide = window.confirm("Are you Sure ? you want to Delete ?")
        if (procide) {
            console.log(id);
            const url = `https://localhost:5000/orders/${id}`
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
                        console.log("deleted");
                        const restorders = orders.filter(order => order._id !== id)
                        setOrders(restorders)
                    }
                })
        }
    }

    const shiftinghendel = (_id) => {
        const procide = window.confirm("Are sure about Sifting?")
        if (procide) {
            fetch(`https://localhost:5000/shiftorders/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }

            }).then(res => res.json())
                .then(data => {
                    toast.success("Order get Shifting")
                    console.log(data);
                })
        }
    }
    return (
        <div>
            <h2>Total Order {orders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra lg:w-full">
                    <thead>
                        <tr className=''>
                            <th className='p-3 w-24 text-xm tracking-wide'></th>
                            <th className='p-3 w-24 text-xm tracking-wide'>user Name</th>
                            <th className='p-3 w-24 text-xm tracking-wide'>Tool Name</th>
                            <th className='p-3 w-24 text-xm tracking-wide'>Quantity</th>
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

                                        <button className='btn btn-xs btn-secondary w-16 text-xm'>UnPaid</button>


                                    }
                                    {
                                        order.paid
                                        &&
                                        <button className='btn btn-xs btn-success w-16' onClick={() => shiftinghendel(order._id)} disabled={order.shift}>Shifting</button>

                                    }
                                    {
                                        order.shift
                                        &&
                                        <button className='btn btn-xs btn-accent w-16' >Delivered</button>


                                    }
                                </td>
                                <td className='p-3 text-sm'>
                                    {
                                        !order.paid
                                        &&
                                        <button className='btn btn-xs' onClick={() => handeldelete(order._id)}>Delete</button>

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

export default ManageAllOrders;