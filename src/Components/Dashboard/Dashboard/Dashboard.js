import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../Firebase.init';
import UseAdmin from '../../Hooks/UseAdmin/UseAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth)
    const [admin] = UseAdmin(user)
    return (
        <div className="drawer drawer-mobile lg:mt-10 ">
            <input id="dashboard-slider" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-slider" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    <li><Link to='/dashboard'>My profile</Link></li>
                    {
                        !admin && <>

                            <li><Link to='/dashboard/myorders'>My Orders</Link></li>
                            <li><Link to='/dashboard/addreview'>Add Review</Link></li>
                        </>
                    }
                    {
                        admin && <>
                            <li><Link to='manageAllorders'>Manage All Orders</Link></li>
                            <li><Link to='addproducts'>Add Products</Link></li>
                            <li><Link to='makeAdmin'>Make Admin</Link></li>
                            <li><Link to='manageProducts'>Manage Products</Link></li>
                        </>

                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;