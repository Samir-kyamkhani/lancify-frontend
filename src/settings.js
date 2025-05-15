export const routeAccessMap = {
  //  routes acces
  "/dashboard": ["admin", "user"],
  "/dashboard/inbox": ["admin", "user", "member"],
  "/dashboard/chat": ["admin", "user", "member"],
  "/dashboard/clients": ["admin", "member"],
  "/dashboard/teams": ["admin", "member"],
  "/dashboard/proposals": ["admin", "member", "user"],
  "/dashboard/projects": ["admin", "member", "user"],
  "/dashboard/payments": ["admin", "member", "user"],
  "/dashboard/integrations": ["admin", "member"],
  "/dashboard/files": ["user"],
  "/dashboard/support": ["admin", "user", "member"],
  "/dashboard/logout": ["admin", "user", "member"],
};

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user;
};

export const getUserRole = () => {
  // const user = getCurrentUser();
  // return user?.data?.user?.role || null;
  return "admin";
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user?.data?.user;
};
