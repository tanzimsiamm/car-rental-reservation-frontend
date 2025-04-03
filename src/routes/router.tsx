import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../components/root/Root";
import Home from "../pages/Home";
import CarDetails from "../pages/CarDetails";
import LoginProtected from "./LoginProtected";
import Booking from "../pages/Booking";
import Cars from "../pages/Cars";
import OrderSuccessPage from "../pages/OrderSuccess";
import AboutUs from "../pages/AboutUs";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../components/dashboard/Dashboard";
import AdminProtected from "./AdminProtected";
import ManageCars from "../components/dashboard/pages/ManageCars";
import ManageBooking from "../components/dashboard/pages/ManageBooking";
import ManageReturnCars from "../components/dashboard/pages/ManageReturnCars";
import ManageUsers from "../components/dashboard/pages/ManageUsers";
import AdminOverview from "../components/dashboard/pages/AdminOverview";
import UserProtected from "./UserProtected";
import MyBooking from "../components/dashboard/pages/MyBookings";
import UserOverview from "../components/dashboard/pages/UserOverview";



export const router = createBrowserRouter([
    {
        path: "*",
        element: <ErrorPage />,
      },
    {
        path : '/',
        element : <Root/> ,
        children : [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/cars/:carId',
                element: <CarDetails/>
            },
            {
                path: '/booking/:carId',
                element: <LoginProtected> <Booking/> </LoginProtected>
                    
                    
            },
            {
                path: '/cars',
                element: <Cars/>
            },
            {
                path: '/order-successful',
                element: <OrderSuccessPage/>
            },
            {
                path: '/about-us',
                element: <AboutUs/>
            },
            // authentication 
            {
                path : '/sign-up',
                element : <SignUp/> ,
            },
            {
                path : '/login',
                element : <Login/> ,
            },
        ]
    },
    // dashboard 

    {path: "/dashboard", element:  <Dashboard/>, children: [

        // for admin
        {path: "manage-cars", element: <AdminProtected> <ManageCars/></AdminProtected> },
        {path: "manage-bookings", element: <AdminProtected> <ManageBooking/></AdminProtected> },
        {path: "manage-return-cars", element: <AdminProtected> <ManageReturnCars/></AdminProtected> },
        {path: "manage-users", element: <AdminProtected> <ManageUsers/></AdminProtected> },
        {path: "admin-overview", element: <AdminProtected> <AdminOverview/></AdminProtected> },

// for user 
        {path: "my-bookings", element: <UserProtected>  <MyBooking/></UserProtected> },
        {path: "user-overview", element: <UserProtected>  <UserOverview/> </UserProtected>},
    ]},
])