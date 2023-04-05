import React from 'react';
import StudentNavbar from '../components/Navbar/StudentNavbar';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
    return (
        <>
            <StudentNavbar />
            <Outlet />
        </>
    );
};

export default StudentLayout;