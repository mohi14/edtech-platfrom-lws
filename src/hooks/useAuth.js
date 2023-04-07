import { useSelector } from "react-redux"

export const useAuth = () => {
    const auth = useSelector(state => state.auth)

    if (auth?.accessToken && auth?.user.role === "admin") {
        return { isLoggedIn: true, navigate: "/admin/dashboard" }
    }
    else if (auth?.accessToken && auth?.user.role === "student") {
        return { isLoggedIn: true, navigate: "/course-player" }
    }
    else {
        return false
    }
}