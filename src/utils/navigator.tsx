import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import LoginLogoutView from "../components/views/LoginView";



const router = createBrowserRouter([
    {
        element: <LoginLogoutView />,
        path: "auth/login"
    }
])

export default router;