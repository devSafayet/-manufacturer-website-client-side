import React from 'react';
import Loading from '../../Pages/Loading/Loading';

const CustomersReview = () => {
    const { data: review, isLoading } =
        () =>
            fetch('http://localhost:5000/getreviews')
                .then(res => res.json())



    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-blue-400 text-center py-5 font-bold text-2xl">Customer All Review</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    review?.map(review => <div key={review._id} className="card max:w-lg m-8  transform transition duration-500 hover:scale-110 bg-blue-400 shadow-xl">
                        <figure className="">
                            <img src={review.img} alt="Shoes" className="rounded-full h-48 w-48 mt-3" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title uppercase text-white">{review.name}</h2>
                            <p className='text-black text-1xl'>{review.review}</p>
                            <p className='text-success'>{review.ratings}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CustomersReview;