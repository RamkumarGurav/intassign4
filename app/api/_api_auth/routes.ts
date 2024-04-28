export const frontendPublicRoutes = ["/"];
export const frontendAuthRoutes = ["/login", "/register"];
export const backendAuthRoutes = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/logout",
];
export const backendAuthPrefix = "/api/v1/auth";
export const frontendAuthPrefix = "/auth";
export const frontendRestrictedRoutePrefix = "/dashboard";
export const backendRestrictedRoutePrefix = "/authorised";
export const backendRestrictedRoutes = [
  "/api/v1/employees/authorised",
  "/api/v1/admin/authorised",
];
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
