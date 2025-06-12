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
import Bookmarks from "../Bookmarks/Bookmarks";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/popular-services",
        Component: PopularService,
      },
      {
        path: "/popular-details/:id",
        element: (
          <PrivateRoutes>
            <PopularDetails />
          </PrivateRoutes>
        ),
        loader: () => fetch("../popularServices.json"),
        hydrateFallbackElement: (
          <span className="loading loading-spinner text-primary"></span>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/allservices",
        Component: AllServices,
        loader: () => fetch("../popularServices.json"),
      },
      {
        path: "/bookmark",
        Component: Bookmarks,
      },
      {
        path: "/add-service",
        Component: AddServises,
      },
      {
        path: "/manage-service",
        Component: ManageService,
      },
      {
        path: "/booked-services",
        Component: BookedServices,
      },
      {
        path: "/service-to-do",
        Component: ServiceToDo,
      },
    ],
  },
]);
