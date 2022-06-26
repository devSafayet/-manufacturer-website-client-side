// import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../../Firebase.init';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imagestorage_key = '6ce6a29e58e377fca117a011056e7eeb';
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false);


    // var current = new Date();
    // console.log(current. getHours());

    const onSubmit = async (data) => {
        setLoading(true);
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
                setLoading(false);
                // console.log(data);
                if (result.success) {
                    const img = result.data.url
                    const review = {
                        review: data.review,
                        ratings: data.ratings,
                        img: img,
                        name: user.displayName,
                        email: user.email

                    }
                    // console.log(review);

                    fetch('http://localhost:5000/review', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(review)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            console.log(inserted);
                            if (inserted.insertedId) {
                                toast.success('Review added Successful.')
                                reset();
                            }
                            else {
                                toast.error('Failed to add Review')
                            }
                        })
                }

            })
    }

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-base-200 p-10 lg:px-20 my-10 rounded' >
                <h3 className="text-2xl text-blue-400 font-bold lg:py-5 text-center">Add your Review</h3>


                <div className='form-control w-full max-w-xs'>
                    <input
                        type="text"
                        placeholder="Add Review"
                        className="input input-bordered input-blue-400 w-full max-w-xs m-3"

                        {...register("review", {
                            required: {
                                value: true,
                                message: 'Review is Required. Please Try Again.'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
                    </label>
                </div>
                <div className='form-control w-full max-w-xs'>
                    <input
                        type="text"
                        placeholder="Add Your Ratings (1-5)"
                        className="input input-bordered input-blue-400 w-full max-w-xs m-3"

                        {...register("ratings", {
                            required: {
                                value: true,
                                message: 'Ratings is Required. Please Try Agian.'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.ratings?.type === 'required' && <span className="label-text-alt text-red-500">{errors.ratings.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full max-w-xs'>
                    <label for="files" className={
                        loading
                            ? "btn btn-primary loading mt-5 w-full max-w-xs m-3"
                            : "btn btn-accent mt-5  w-full max-w-xs m-3"
                    }>Upload Your Image</label>
                    <input
                        type="file"
                        id="files"
                        className="input hidden input-bordered w-full max-w-lg"

                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required.Please Try Again.'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                    </label>
                </div>


                <div className='form-control w-full max-w-xs'>
                    <input type="submit" placeholder="Type here" className="btn bg-blue-400 w-full max-w-lg m-3" />
                </div>



            </form>
        </div>
    );
};

export default AddReview;