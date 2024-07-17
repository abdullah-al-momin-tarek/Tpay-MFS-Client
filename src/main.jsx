import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Dashboard from "./Dashboard/Dashboard";
import Overview from "./Dashboard/SharedDashboard/Overview";
import CashIn from "./Dashboard/UserDashboard/CashIn";
import CashOut from "./Dashboard/UserDashboard/CashOut";
import SendMoney from "./Dashboard/UserDashboard/SendMoney";
import "./index.css";
import AuthProvider from "./Pages/Providers/AuthProvider";
import PrivateRoute from "./Route/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/sendMoney",
        element: (
          <PrivateRoute>
            <SendMoney />
          </PrivateRoute>
        ),
      },
      {
        path: "/overview",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "/cashOut",
        element: (
          <PrivateRoute>
            <CashOut />
          </PrivateRoute>
        ),
      },
      {
        path: "/cashin",
        element: (
          <PrivateRoute>
            <CashIn />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
