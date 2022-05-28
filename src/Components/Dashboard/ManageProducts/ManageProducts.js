import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProducts = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const url = "https://localhost:5000/products";

        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products])


    const heldelDelete = (id) => {

        const procide = window.confirm("Are you sure? you want to Delete?")

        if (procide) {
            fetch(`https://localhost:5000/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount > 0) {
                        toast.success("Product deletes Successful")

                    }
                })
        }

    }
    return (
        <div>
            <h3 className="text-3xl text-blue-400 mb-4">This Manager products {products?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>price per pice</th>
                            <th>order Quantity</th>
                            <th>Manage</th>
                            <th>Add Product</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products?.map((product, index) => <tr key={product._id} className='bg-slate-400'>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className='btn btn-xs bg-red-500 text-white' onClick={() => heldelDelete(product._id)}>Delete</button>
                                </td>
                                <td>
                                    <Link className='btn btn-outline' to='/dashboard/addproducts'>Add Product</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;