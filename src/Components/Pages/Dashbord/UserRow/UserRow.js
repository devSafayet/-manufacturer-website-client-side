import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, setDeleteUser, index }) => {

    const { email, role } = user;
    const hendelMakeAdmin = () => {
        fetch(`https://blooming-beyond-08690.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an Admin')
                }
                return res.json()
            })
            .then(data => {
                // console.log(data);
                if (data.result.modifiedCount > 0) {

                    toast.success('Successful made an Admin')
                }
            })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>
                {
                    role !== 'admin'
                    &&
                    <button onClick={hendelMakeAdmin} className="btn bg-blue-400">make Admin</button>
                }
            </td>
            <td><label onClick={() => setDeleteUser(user)} htmlFor="user-modal" className="btn modal-button btn-xs  btn-error">Remove</label></td>
        </tr>
    );
};

export default UserRow;