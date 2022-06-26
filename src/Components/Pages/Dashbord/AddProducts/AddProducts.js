import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../../Firebase.init';

const AddProducts = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);


    const imagestorage_key = '6ce6a29e58e377fca117a011056e7eeb';

    const onSubmit = async data => {
        setLoading(true)
        const formData = new FormData();
        const image = data.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imagestorage_key}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {

                setLoading(false)

                if (result.success) {
                    const img = result.data.url
                    const product = {
                        name: data.name,
                        decreption: data.decreption,
                        quantity: data.quantity,
                        minimum: data.minimum,
                        price: data.price,
                        img: img
                    }
                    console.log(product);
                    // send to you database
                    fetch('https://blooming-beyond-08690.herokuapp.com/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            console.log(inserted);
                            if (inserted.insertedId) {
                                toast.success('Product added successfully')
                                reset();
                            }
                            else {
                                toast.error('Failed to Add this Product')
                            }
                        })
                }
            })


    }

    return (
        <div className='flex justify-center items-center '>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-base-200 p-10 lg:px-20 my-10 rounded'>
                <h2 className="text-2xl text-blue-400 text-center font-blod font-semibold mb-5">Add new Product</h2>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Product Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Product Name"
                        className="input input-bordered w-full max-w-xs"
                        required
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Short Decreption</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="Enter Short Decreption"
                        className="input input-bordered w-full max-w-xs"
                        required
                        {...register("decreption", {
                            required: {
                                value: true,
                                message: 'decreption is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Product Price</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Product Price"
                        className="input input-bordered w-full max-w-xs"
                        required
                        {...register("price", {
                            required: {
                                value: true,
                                message: 'price is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Product Quantity</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter Product Quantity"
                        className="input input-bordered w-full max-w-xs"
                        required
                        {...register("quantity", {
                            required: {
                                value: true,
                                message: 'Quantity is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-base font-semibold">Minumum Order Quantity</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter minimum order"
                        className="input input-bordered w-full max-w-xs"
                        required
                        {...register("minimum", {
                            required: {
                                value: true,
                                message: 'Quantity is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label for="files" className={
                        loading
                            ? "btn btn-secondary loading mt-5 w-full max-w-xs"
                            : "btn btn-primary mt-5  w-full max-w-xs "
                    }>Upload product Image</label>
                    <input
                        type="file"
                        id="files"
                        className="input hidden input-bordered w-full max-w-xs"
                        required
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                    </label>
                </div>

                <div className="flex flex-col w-full border-opacity-50">
                    <input type="submit" value="Add New Product" className="grid btn bg-blue-400 rounded-box place-items-center input input-bordered w-full max-w-xs" />

                </div>
            </form>
        </div>
    );
};

export default AddProducts;