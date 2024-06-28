import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import LoginLogoutView from "../components/views/LoginView";
import HomePageView from "../components/views/HomePageView";
import ProtectedRoute from "./protectedRoute";
import { get_auth_token } from "./localStorageManager";



const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <HomePageView />,
                path: "/"
            }
        ]
    }, {
        element: <LoginLogoutView />,
        path: '/auth/login'
    }
])

export default router;