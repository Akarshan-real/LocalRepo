import { createBrowserRouter } from "react-router-dom";
//Pages
import App from "../App";
import AuthorizedPage from "../components/AuthorizedPage";
import ProtectedRoute from "../components/ProtectedRoute";
import LOGIN from "../components/LOGIN";

export const router = createBrowserRouter([
    {
        path : '/authorized' , element : (
            <ProtectedRoute>
                <AuthorizedPage />
            </ProtectedRoute>
        )
    }
    ,
    {
        path : '/login' , element : <LOGIN />
    }
    ,
    {
        path : '/' , element : <App />
    }
]);