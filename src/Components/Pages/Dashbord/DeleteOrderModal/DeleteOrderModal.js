import React from 'react';
import { toast } from 'react-toastify';

const DeleteUserModal = ({ orderDelete, setOrderDelete }) => {
    // const { name,email } = orderDelete;

    const hendeldelete = () => {

        const url = `http://localhost:5000/orders/${orderDelete._id}`
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
            <input type="checkbox" id="cencel-order-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are You Sure You Want to Delete !</h3>
                    <p className="py-4">hey if you delete that not will be your order anymore</p>
                    <div className="modal-action">
                        <button className="btn btn-xs btn-error" onClick={hendeldelete}>Delete</button>
                        <label for="cencel-order-modal" className="btn btn-xs">Cencel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteUserModal;