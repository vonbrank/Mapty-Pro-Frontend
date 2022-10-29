import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";

const customRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  // {
  //     path: "/login",
  //     element: <Login />,
  // },
]);

export default customRouter;
