import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  backendAuthPrefix,
  frontendAuthRoutes,
  frontendRestrictedRoutePrefix,
  frontendPublicRoutes,
  backendRestrictedRoutePrefix,
} from "./app/api/_api_auth/routes";
import { isAllowed } from "./app/api/_api_middlewares/isAllowed";

// export default async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const res = NextResponse.next();

//   if (pathname.startsWith("/dashboard")) {
//     return await isRouteAuthorised(req, res);
//   } else if (pathname.startsWith("/api/v1/employees/authorised")) {
//     return await isApiRouteAuthorised(req, res);
//   } else {
//     return res;
//   }
// }

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const res = NextResponse.next();
  const isUserAllowed: any = await isAllowed(req, res, ["admin"]);
  // console.log(isLoggedIn);

  const isBackendAuthRoute = nextUrl.pathname.startsWith(backendAuthPrefix);
  const isFrontendPublicRoute = frontendPublicRoutes.includes(nextUrl.pathname);
  const isFrontendAuthRoute = frontendAuthRoutes.includes(nextUrl.pathname);
  const isFrontendRestrictedRoute = nextUrl.pathname.startsWith(
    frontendRestrictedRoutePrefix
  );
  const isBackendRestrictedRoute = nextUrl.pathname.includes(
    backendRestrictedRoutePrefix
  );

  /**
   *if the reqest route is frontend auth route like login,register then first check
   * if the user is allready loggedin if he is loggedin then redirect him to dashboard
   * and if he is not logged in then allow the route
   */
  if (isFrontendAuthRoute) {
    if (isUserAllowed == false) {
      return res;
    }
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  /**
   *if the reqest route is frontend restricted route like dashboard then first check
   * if the user is allready loggedin and is admin, if he is loggedin admin  then allow him and
   * and if he is not logged admin in then redirect him to login page
   */
  if (isFrontendRestrictedRoute) {
    if (isUserAllowed == false) {
      return NextResponse.redirect(new URL("login", nextUrl));
    }
    return isUserAllowed;
  }

  /**
   *if the reqest route is backend restricted route like /api/v1/employees/list then first check
   * if the user is allready  and is admin if he is loggedin admin then allow him and
   * if he is not loggedin or not admin then give him a 403 response
   * */
  if (isBackendRestrictedRoute) {
    if (isUserAllowed == false) {
      return NextResponse.json(
        { status: false, message: "You are not allowed to do this action" },
        { status: 403 }
      );
    }
    return isUserAllowed;
  }

  /**
   * allow all remain backend and frontend routes
   * */
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
