import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch((err) => console.log("Token verification error", err));
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);

    // Verify token and set user info
    fetch("http://localhost:5000/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((err) => console.log("Token verification error", err));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const item = { user, login, logout };
  return <AuthContext.Provider value={item}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
