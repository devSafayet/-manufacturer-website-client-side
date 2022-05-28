import React from 'react';
import { toast } from 'react-toastify';

const DeleteOrder = () => {
    const handledelete = ({ orderDelete, setOrderDelete }) => {

        const url = `https://localhost:5000/orders/${orderDelete._id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("Delete Order successfully")
                    setOrderDelete(null)
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="cancel-order-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are You Sure You Want to Delete !</h3>
                    <p className="py-4"> If you delete that not will be your order Anymore?</p>
                    <div className="modal-action">
                        <button className="btn btn-xs btn-error" onClick={handledelete}>Delete</button>
                        <label for="cancel-order-modal" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteOrder;