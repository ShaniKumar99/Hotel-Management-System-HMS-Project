import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { API_ENDPOINTS } from "../utils/constants";
import { useAuth } from "./AuthContext";

export const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const { user } = useAuth();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [activeGuests, setActiveGuests] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [housekeepingTasks, setHousekeepingTasks] = useState([]);
  const [CheckedINNOut, setCheckedINNOut] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        let results = [];
        const userRole = user.role?.toLowerCase()?.trim() || "";

        console.log("DashboardContext fetching data for role:", userRole);

        if (["admin", "manager"].includes(userRole)) {
          // Use Promise.allSettled to handle individual failures gracefully
          const promises = [
            api.get(API_ENDPOINTS.TOTAL_REVENUE),
            api.get(API_ENDPOINTS.TOTAL_BOOKINGS),
            api.get(API_ENDPOINTS.ACTIVE_GUESTS),
            api.get(API_ENDPOINTS.AVAILABLE_ROOMS),
            api.get(API_ENDPOINTS.RECENT_BOOKINGS),
            api.get(API_ENDPOINTS.HOUSEKEEPING_TASKS),
            api.get(API_ENDPOINTS.GET_ALL_CHECKED_IN_N_CHECKOUT),
          ];

          results = await Promise.allSettled(promises);
          console.log("DashboardContext API results:", results);

          // Handle results - use default values if any API call fails
          let i = 0;
          const handleResult = (index, defaultValue) => {
            const result = results[index];
            if (result.status === "fulfilled") {
              return result.value?.data || defaultValue;
            } else {
              console.warn(`API call ${index} failed:`, result.reason?.message || result.reason);
              return defaultValue;
            }
          };

          setTotalRevenue(handleResult(i++, {}).totalRevenue || 0);
          setTotalBookings(handleResult(i++, {}).totalBookings || 0);
          setActiveGuests(handleResult(i++, {}).totalActiveGuests || 0);
          setAvailableRooms(handleResult(i++, {}).totalRooms || 0);
          setRecentBookings(handleResult(i++, {}).bookings || []);
          setHousekeepingTasks(handleResult(i++, {}).tasks || []);
          setCheckedINNOut(handleResult(i++, {}) || []);
        } else if (userRole === "receptionist") {
          // Use Promise.allSettled for consistency
          const promises = [
            api.get(API_ENDPOINTS.ACTIVE_GUESTS),
            api.get(API_ENDPOINTS.AVAILABLE_ROOMS),
            api.get(API_ENDPOINTS.GET_ALL_CHECKED_IN_N_CHECKOUT),
          ];

          results = await Promise.allSettled(promises);
          
          const handleResult = (index, defaultValue) => {
            const result = results[index];
            if (result.status === "fulfilled") {
              return result.value?.data || defaultValue;
            } else {
              console.warn(`API call ${index} failed:`, result.reason?.message || result.reason);
              return defaultValue;
            }
          };

          let i = 0;
          setActiveGuests(handleResult(i++, {}).totalActiveGuests || 0);
          setAvailableRooms(handleResult(i++, {}).totalRooms || 0);
          setCheckedINNOut(handleResult(i++, {}) || []);
        }
      } catch (error) {
        console.error(
          "Dashboard data fetch error:",
          error.response?.data?.message || error.message
        );
        console.error("Error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          message: error.response?.data?.message || error.message
        });
        // Don't let errors break the dashboard - set default values
        console.log("Setting default values due to error - dashboard will still render");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const value = {
    totalRevenue,
    totalBookings,
    activeGuests,
    availableRooms,
    recentBookings,
    housekeepingTasks,
    CheckedINNOut,
    loading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};