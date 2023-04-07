import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import StudentLogin from "../pages/StudentLogin";
import StudentRegistration from "../pages/StudentRegistration";
import StudentLayout from "../layout/StudentLayout";
import CoursePlayer from "../pages/CoursePlayer";
import AdminRoutes from "../components/AdminRoutes/AdminRoutes";
import StudentRoutes from "../components/StudentRoutes/StudentRoutes";
import PublicRoutes from "../components/PublicRoutes/PublicRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoutes><StudentLogin /></PublicRoutes>
    },
    {
        path: "/student-registration",
        element: <PublicRoutes><StudentRegistration /></PublicRoutes>
    },
    {
        path: "/",
        element: <StudentLayout />,
        children: [
            {
                path: "/course-player",
                element: <StudentRoutes> <CoursePlayer /></StudentRoutes>
            }
        ]
    },
    {
        path: "/admin",
        element: <PublicRoutes><AdminLogin /></PublicRoutes>
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminRoutes><Dashboard /></AdminRoutes>
            }
        ]
    }

])