import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const ManageReview = () => {
    const { data: review, refetch } = useQuery('reviews', () => fetch('https://localhost:5000/getreviews', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    // console.log(review);

    const heldelDelete = (id) => {

        const procide = window.confirm("Are you sure? You want to Delete?")

        if (procide) {
            fetch(`https://localhost:5000/review/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount > 0) {
                        refetch()
                        toast.success("Product Delete Successful")
                    }
                })
        }


    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            review?.map((review, index) => <tr key={review._id}>
                                <th>{index + 1}</th>
                                <td>{review.name}</td>
                                <td>{review.email}</td>
                                <td>
                                    <button className='btn btn-xs bg-warning' onClick={() => heldelDelete(review._id)}>Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageReview;