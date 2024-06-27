import { createRoot } from "react-dom/client";
import router from "./utils/navigator";
import { RouterProvider } from "react-router-dom";




const root = createRoot(document.getElementById('root')!)



root.render(
    <RouterProvider router={router} />
)