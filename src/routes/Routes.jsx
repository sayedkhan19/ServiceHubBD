import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    errorElement:<NotFound></NotFound>,
    children:[
        {
            index:true,
            Component: Home,
        }
    ]
  },
]);