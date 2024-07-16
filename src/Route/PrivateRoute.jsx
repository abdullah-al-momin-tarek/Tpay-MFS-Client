import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("token");

  if (user) {
    return children;
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;
