import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../Firebase.init';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imagestorage_key = '8c9e657645bc7264c5c4e9c24848e699';
    const [user] = useAuthState(auth)
    console.log(user);
    const onSubmit = async (data) => {

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
                if (result.success) {
                    const img = result.data.url
                    const review = {
                        review: data.review,
                        ratings: data.ratings,
                        img: img,
                        name: user.displayName,
                        email: user.email

                    }
                    console.log(review);

                    fetch('https://localhost:5000/review', {
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
                                toast.success('Review add successful.')
                                reset();
                            }
                            else {
                                toast.error('Failed to added Review')
                            }
                        })
                }

            })
    }

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-100 p-10 lg:px-20 my-10 rounded' >
                <h3 className="text-2xl text-blue-400 font-bold lg:py-5 text-center">Send your Review</h3>


                <div className='form-control w-full max-w-xs'>
                    <input
                        type="text"
                        placeholder="Send Your Review"
                        className="input input-bordered input-success w-full max-w-xs m-3"

                        {...register("review", {
                            required: {
                                value: true,
                                message: 'Review is Required'
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
                        placeholder="Send Your Ratings 1-5"
                        className="input input-bordered input-success w-full max-w-xs m-3"

                        {...register("ratings", {
                            required: {
                                value: true,
                                message: 'Ratings is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.ratings?.type === 'required' && <span className="label-text-alt text-red-500">{errors.ratings.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full max-w-xs'>
                    <label for="files" className="btn btn-success text-white w-full max-w-xs m-3">Upload Your Image</label>
                    <input
                        type="file"
                        id="files"
                        className="input hidden input-bordered w-full max-w-lg"

                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                    </label>
                </div>


                <div className='form-control w-full max-w-xs'>
                    <input type="submit" placeholder="Type here" className="btn btn-primary w-full max-w-lg m-3" />
                </div>



            </form>
        </div>
    );
};

export default AddReview;