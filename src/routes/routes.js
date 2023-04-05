import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import StudentLogin from "../pages/StudentLogin";
import StudentRegistration from "../pages/StudentRegistration";
import StudentLayout from "../layout/StudentLayout";
import CoursePlayer from "../pages/CoursePlayer";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <StudentLogin />
    },
    {
        path: "/student-registration",
        element: <StudentRegistration />
    },
    {
        path: "/",
        element: <StudentLayout />,
        children: [
            {
                path: "/course-player",
                element: <CoursePlayer />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <Dashboard />
            }
        ]
    }

])