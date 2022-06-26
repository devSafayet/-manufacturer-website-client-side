import React from 'react';
import { toast } from 'react-toastify';

const DeleteUserModal = ({ deleteUser, setDeleteUser }) => {
    const { email } = deleteUser;

    const hendelDelete = () => {

        fetch(`https://blooming-beyond-08690.herokuapp.com/user/admin/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

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
                    <h3 className="font-bold text-lg text-red-500">Are You Sure?</h3>
                    <p className="py-4">Are you sure, You want to Remove User?</p>
                    <div className="modal-action">
                        <button className="btn btn-xs btn-error" onClick={hendelDelete}>Delete</button>
                        <label htmlFor="user-modal" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteUserModal;