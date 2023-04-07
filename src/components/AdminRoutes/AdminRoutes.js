import React from 'react';
import { useAuthAdmin } from '../../hooks/useAuthAdmin';
import { Navigate } from 'react-router-dom';


const AdminRoutes = ({ children }) => {
    const isAdminLoggedIn = useAuthAdmin()
    return isAdminLoggedIn ? children : <Navigate to="/admin" />
};

export default AdminRoutes;