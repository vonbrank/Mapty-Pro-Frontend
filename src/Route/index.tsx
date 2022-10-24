import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

const customRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    // {
    //     path: "/login",
    //     element: <Login />,
    // },
]);

export default customRouter;
