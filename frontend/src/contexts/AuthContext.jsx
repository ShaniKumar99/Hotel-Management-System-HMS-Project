import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { API_ENDPOINTS, DASHBOARD_ROUTES } from "../utils/constants";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored and user data
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Normalize role when loading from localStorage
        if (parsedUser.role) {
          parsedUser.role = parsedUser.role.toLowerCase().trim();
        }
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.LOGIN,
        { email, password },
        { withCredentials: true } // ✅ send credentials like cookies
      );

      const user = response.data.user;
      // Normalize role to ensure consistency
      if (user.role) {
        user.role = user.role.toLowerCase().trim();
      }
      console.log("Login successful, user role:", user.role);
      console.log("Full user object:", user);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      const dashboardRoute = DASHBOARD_ROUTES[user.role];
      console.log("Dashboard route for role", user.role, ":", dashboardRoute);
      if (dashboardRoute) {
        navigate(dashboardRoute);
      } else {
        console.warn("No dashboard route found for role:", user.role, "redirecting to guest");
        navigate("/dashboard/guest");
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to connect to server";

      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.GUEST_REGISTER, userData);
      if (response.data) {
        navigate("/login");
        return { success: true };
      }
      return { success: false, error: "Registration failed. Please try again." };
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await api.post(
        API_ENDPOINTS.LOGOUT,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};