import { useSelector } from "react-redux"

export const useAuthAdmin = () => {
    const auth = useSelector(state => state.auth)
    if (auth?.accessToken && auth?.user.role === "admin") {
        return true
    }
    else {
        return false
    }
}