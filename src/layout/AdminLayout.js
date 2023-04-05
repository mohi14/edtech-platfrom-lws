import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/Navbar/AdminNavbar';

const AdminLayout = () => {
    return (
        <>
            <AdminNavbar></AdminNavbar>
            <Outlet />
        </>
    );
};

export default AdminLayout;