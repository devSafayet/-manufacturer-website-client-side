import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../Firebase.init';
import Loading from '../../Pages/Loading/Loading';
import UseAdmin from '../UseAdmin/UseAdmin';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = UseAdmin(user)
    const location = useLocation()

    if (loading || adminLoading) {
        return <Loading></Loading>
    }


    if (!user || !admin) {
        localStorage.removeItem('accessToken')
        toast.error("It is procced for Admin")
        signOut(auth)
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAdmin;