import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Dashboard from "./Dashboard/Dashboard";
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
