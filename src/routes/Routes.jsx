import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import PopularService from "../components/HomeElementPages/PopularService";
import PopularDetails from "../pages/PopularDetails";
import Login from "../pages/Login";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    errorElement:<NotFound></NotFound>,
    children:[
        {
            index:true,
            Component: Home,
        },
        {
            path:"/popular-services",
            Component: PopularService,
        },
        {
            path:"/popular-details/:id",
            Component:PopularDetails,
            loader: ()=> fetch("../popularServices.json"),
        },
        {
            path:"/login",
            Component: Login,
        }
    ]
  },
]);