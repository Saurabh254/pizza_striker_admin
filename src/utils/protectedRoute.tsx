import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { get_auth_token } from './localStorageManager';
import Header from '../components/common/Header';
const ProtectedRoute = () => {
    const isAuthenticated = get_auth_token() ? true : false;
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>
        <Header className=' z-10 top-0 sticky' /><Outlet />
    </>
};

export default ProtectedRoute;