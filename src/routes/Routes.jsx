import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import PopularService from "../components/HomeElementPages/PopularService";
import PopularDetails from "../pages/PopularDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import AddServises from "../ServisesPage/AddServises";
import ManageService from "../ServisesPage/ManageService";
import BookedServices from "../ServisesPage/BookedServices";
import ServiceToDo from "../ServisesPage/ServiceToDo";
import AllServices from "../pages/AllServices";



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
            element:<PrivateRoutes>
                <PopularDetails></PopularDetails>
            </PrivateRoutes>,
            loader: ()=> fetch("../popularServices.json"),
        },
        {
            path:"/login",
            Component: Login,
        },
        {
            path:"/register",
            Component:Register,
        },
        {
            path:"/allservices",
            Component:AllServices,
            loader:()=> fetch("../popularServices.json")
        },
        {
            path:"/dashboard",
            element:<PrivateRoutes>
                <DashboardLayout></DashboardLayout>
            </PrivateRoutes>,
            children:[
                {
                    path:"/dashboard/add-service",
                    Component:AddServises,
                },
                {
                    path:"/dashboard/manage-service",
                    Component:ManageService,
                },
                {
                    path:"/dashboard/booked-services",
                    Component:BookedServices,
                },
                {
                    path:"/dashboard/service-to-do",
                    Component:ServiceToDo,
                }
            ]
        }
    ]
  },
]);