import React from 'react';
import { toast } from 'react-toastify';

const DeleteUser = ({ deleteUser, setDeleteUser }) => {
    const { email } = deleteUser;

    const hendelDelete = () => {

        fetch(`https://localhost:5000/user/admin/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.deletedCount) {
                    toast.success(`User ${email} is deleted`)
                    setDeleteUser(null)

                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="user-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are You Sure You Want to Delete?</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <button className="btn btn-xs btn-error" onClick={hendelDelete}>Delete</button>
                        <label htmlFor="user-modal" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteUser;