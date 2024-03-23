import { createBrowserRouter } from "react-router-dom";
import "./index.css";

import NotFoundPage from "./pages/404";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import AddFeedPage from "./pages/AddFeed";
import AddRss from "./pages/AddRss";
import ImportFile from "./pages/ImportFile";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/add",
    element: <AddFeedPage />,
    children: [
      {
        path: "/add/rss",
        element: <AddRss />,
      },
      {
        path: "/add/import",
        element: <ImportFile />,
      },
    ],
  },
]);
