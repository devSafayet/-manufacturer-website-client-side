import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, setDeleteUser, index }) => {
    const { email, role } = user;
    const hendelMakeAdmin = () => {
        fetch(`https://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to make Admin')
                }
                return res.json()
            })
            .then(data => {
                console.log(data);
                if (data.result.modifiedCount > 0) {

                    toast.success('Successful made Admin')
                }
            })
    }
    return (
        <div>
            <tr>
                <th>{index + 1}</th>
                <td>{email}</td>
                <td>
                    {
                        role !== 'admin'
                        &&
                        <button onClick={hendelMakeAdmin} className="btn">Make Admin</button>
                    }
                </td>
                <td><label onClick={() => setDeleteUser(user)} htmlFor="user-modal" className="btn modal-button btn-xs  btn-error">Delete</label></td>
            </tr>
        </div>
    );
};

export default UserRow;