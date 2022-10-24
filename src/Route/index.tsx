import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const customRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    // {
    //     path: "/login",
    //     element: <Login />,
    // },
]);

export default customRouter;
