import { createBrowserRouter } from "react-router-dom";
//Pages
import App from "../App";
import AuthorizedPage from "../components/AuthorizedPage";
import LOGIN from "../components/LOGIN";
import Signup from "../components/SIGNUP";

export const router = createBrowserRouter([
    {
        path : '/authorized' , element : <AuthorizedPage />
    }
    ,
    {
        path : '/login' , element : <LOGIN />
    }
    ,
    {
        path : '/signup' , element : <Signup />
    }
    ,
    {
        path : '/' , element : <App />
    }
]);