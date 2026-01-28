// User roles
export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  RECEPTIONIST: "receptionist",
  HOUSEKEEPING: "housekeeping",
  GUEST: "guest",
};

// Dashboard routes based on roles
export const DASHBOARD_ROUTES = {
  [ROLES.ADMIN]: "/dashboard/admin",
  [ROLES.MANAGER]: "/dashboard/manager",
  [ROLES.RECEPTIONIST]: "/dashboard/receptionist",
  [ROLES.HOUSEKEEPING]: "/dashboard/housekeeping",
  [ROLES.GUEST]: "/dashboard/guest",
};

// Room types
export const ROOM_TYPES = {
  STANDARD: "standard",
  DELUXE: "deluxe",
  SUITE: "suite",
  PRESIDENTIAL: "presidential",
};

// Booking status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CHECKED_IN: "checked_in",
  CHECKED_OUT: "checked_out",
  CANCELLED: "cancelled",
};

// Task status
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

// API endpoints  for backend integration
export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  //GUEST
  GUEST_REGISTER: "/guest/register",
  GET_ALL_GUEST: "/guest/",
  DELETE_GUEST: "/guest/delete",
  UPDATE_PROFILE: "/auth/update-profile",
  //
  RECEPTIONIST_REGISTER: "/receptionist/register",
  HOUSEKEEPING_REGISTER: "/housekeeping/register",
  MANAGER_REGISTER: "/manager/register",
  GET_ALL_STAFF: "/admin/staff",
  DELETE_STAFF: "/admin/staff/delete",
  UPDATE_STAFF: "/admin/staff/update",
  //
  REFRESH: "/auth/refresh",
  //rooms
  GET_ALL_AVAILABLE_ROOMS: "/rooms/available/rooms",
  GET_ALL_ROOMS: "/rooms",
  UPDATE_ROOM: "/rooms/update",
  CREATE_ROOM: "/rooms/create",
  DELETE_ROOM: "/rooms/delete",
  GET_SINGLE_ROOM: "/rooms",
  OTHERS_ROOMS: "/rooms/available/rooms/other",
  UPDATE_TASKS: "/tasks/update",
  DELETE_TASKS: "/tasks",
  UPDATE_STATUS: "/tasks",
  //bookings
  BOOKINGS: "/bookings",
  CREATE_BOOKING: "/bookings/create",
  UPDATE_BOOKING: "/bookings/update",
  DELETE_BOOKING: "/bookings/delete",
  // billings
  BILLINGS: "/billings",
  // reviews
  REVIEWS: "/reviews",
  DELETE_REVIEW: "/reviews",
  GET_REVIEWS_BY_ROOM: "/reviews",
  // TASK
  GET_ALL_TASK: "/tasks",
  GET_ALL_HOUSEKEEPING: "/housekeeping",
  CREATE_TASK: "/tasks/create",

  USERS: "/users",
  DASHBOARD: "/dashboard",
  LOGOUT: "/auth/logout",
  // dashborad
  TOTAL_REVENUE: "/billings/total-revenue",
  ACTIVE_GUESTS: "/guest/active-guests/count",
  AVAILABLE_ROOMS: "/rooms/available/rooms/count",
  RECENT_BOOKINGS: "/bookings/recent/bookings",
  HOUSEKEEPING_TASKS: "/tasks",
  TOTAL_BOOKINGS: "/bookings/total",
  //housekeeping /my-tasks"
  MY_TASKS: "/housekeeping/my-tasks",
  //receptionist
  GET_ALL_CHECKED_IN_N_CHECKOUT: "/bookings/checkinandcheckoutguest",
  // guest
  GUEST_BOOKINGS: "/bookings/my-bookings",
  // paymentonline
  PAYMENT_INTENT: "/billings/payment-intent",
  CONFIRM_BILLING: "/billings/confirm",
};