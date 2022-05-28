import React, { useEffect, useState } from 'react';
import DeleteUser from '../DeleteUser/DeleteUser';
import UserRow from '../UserRow/UserRow';

const AllUser = () => {
    const [user, setUser] = useState([])
    const [deleteUser, setDeleteUser] = useState(null)

    useEffect(() => {
        fetch(`https://localhost:5000/users`, {
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
            <h3 className="text-3xl text-blue-500">this is make admin {users?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Roll</th>
                            <th>Favorite Color</th>
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
            {deleteUser && <DeleteUser
                deleteUser={deleteUser}
                setDeleteUser={setDeleteUser}

            ></DeleteUser>}
        </div>
    );
};

export default AllUser;