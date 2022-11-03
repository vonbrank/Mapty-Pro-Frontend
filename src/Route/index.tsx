import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";
import Login from "../pages/Login";
import DiscoveryPage from "../pages/DiscoveryPage";
import AboutPage from "../pages/AboutPage";

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
      {
        path: "discovery",
        element: <DiscoveryPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default customRouter;
