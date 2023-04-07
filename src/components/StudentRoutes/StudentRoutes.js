import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStudent } from '../../hooks/useAuthStudent';


const StudentRoutes = ({ children }) => {
    const isStudentLoggedIn = useAuthStudent()
    return isStudentLoggedIn ? children : <Navigate to="/" />
};

export default StudentRoutes;