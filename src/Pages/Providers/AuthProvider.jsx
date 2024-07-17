import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        })
        .catch((err) => {
          console.log("Token verification error", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
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
          setLoading(false);
        }
      })
      .catch((err) => console.log("Token verification error", err));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const item = { user, login, logout, loading };

  return <AuthContext.Provider value={item}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
