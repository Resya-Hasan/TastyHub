import { Outlet, useNavigate } from "react-router"
import Navbar from "../components/Navbar"
import { Navigate } from "react-router"


const MainLayout = () => {

    if (!localStorage.getItem("access_token")) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <Navbar />

            <Outlet />
        </>
    )
}

export default MainLayout