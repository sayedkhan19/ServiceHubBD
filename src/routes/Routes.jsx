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
import Profile from "../pages/Profile";


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
        hydrateFallbackElement:<span className="loading loading-bars loading-xl"></span>,
      },
      {
        path: "/bookmark",
        element:<PrivateRoutes>
          <Bookmarks></Bookmarks>
        </PrivateRoutes>,
      },
      {
        path: "/add-service",
        element:<PrivateRoutes>
          <AddServises></AddServises>
        </PrivateRoutes>,
      },
      {
        path: "/manage-service",
        element:<PrivateRoutes>
          <ManageService></ManageService>
        </PrivateRoutes>,
      },
      {
        path: "/booked-services",
        element:<PrivateRoutes>
          <BookedServices></BookedServices>
        </PrivateRoutes>,
      },
      {
        path: "/service-to-do",
        element:<PrivateRoutes>
          <ServiceToDo></ServiceToDo>
        </PrivateRoutes>,
      },
      {
        path: "/profile",
        element: <PrivateRoutes>
          <Profile></Profile>
        </PrivateRoutes>
      }
    ],
  },
]);
