import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { get_auth_token } from './localStorageManager';

const ProtectedRoute = () => {
    const isAuthenticated = get_auth_token() ? true : false;
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;