import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutButton = () => {
    const dispatch = useDispatch();

    const logOutHandler = async () => {
        try {
            await authService.logout()
            dispatch(logout());
        }
        catch (error) {
            console.log("Error : ", error);
        };
    }

    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ease-in-out transition-colors"
            onClick={logOutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutButton
