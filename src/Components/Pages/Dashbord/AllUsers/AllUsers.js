import React, { useState, useEffect } from 'react';
import DeleteUserModal from '../DeleteUserModal/DeletedUserModal';
import UserRow from '../UserRow/UserRow';

const MakeAdmin = () => {
    const [user, setUser] = useState([])
    const [deleteUser, setDeleteUser] = useState(null)

    useEffect(() => {
        fetch(`https://blooming-beyond-08690.herokuapp.com/users`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => setUser(data))
    }, [user])

    // console.log(user);
    let users = []
    if (user) {
        users = user;
    }

    return (
        <div>
            <h3 className="text-3xl text-center mb-5 text-blue-400">All Users: {users?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Roll</th>
                            <th>Remove User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <UserRow
                                key={user._id}
                                user={user}
                                index={index}
                                setDeleteUser={setDeleteUser}
                            ></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
            {deleteUser && <DeleteUserModal
                deleteUser={deleteUser}
                setDeleteUser={setDeleteUser}

            ></DeleteUserModal>}
        </div>
    );
};

export default MakeAdmin;