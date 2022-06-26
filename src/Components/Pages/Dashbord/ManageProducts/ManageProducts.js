import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const url = "https://blooming-beyond-08690.herokuapp.com/products";

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

        const procide = window.confirm("Are you Sure, You want to Delete?")

        if (procide) {
            fetch(`https://blooming-beyond-08690.herokuapp.com/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount > 0) {
                        toast.success("Product Delete Successfully.")

                    }
                })
        }

    }

    return (
        <div>
            <h3 className="text-2xl text-blue-400 text-center mb-5"> All Products Manage: {products?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Product Price</th>
                            <th>Order Quantity</th>
                            <th>Manage</th>
                            <th>Update Product</th>
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
                                    <button className='btn btn-xs bg-red-400' onClick={() => heldelDelete(product._id)}>Delete</button>

                                </td>
                                <td>
                                    <Link className='btn btn-outline' to={`/dashbord/updateproducts/${product._id}`}>Update Product</Link>
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