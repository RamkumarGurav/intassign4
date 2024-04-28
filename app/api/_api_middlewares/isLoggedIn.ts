import { NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { decrypt, encrypt, sendCookie } from "../_api_auth/auth";

export async function isLoggedIn(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  const cookieStore = cookies();
  let token;

  if (
    headersList.get("Authorization") &&
    headersList.get("Authorization")?.startsWith("Bearer")
  ) {
    token = headersList.get("Authorization")?.split(" ")[1]; //jwt token that is sent in headers authorization field
  } else if (cookieStore.get("session")) {
    //if there is jwt in cookie
    token = cookieStore.get("session")?.value;
  }

  if (!token) {
    return false;
  }

  const jwtPayload = await decrypt(token);
  const userData = { ...jwtPayload.data };

  if (!userData) {
    return false;
  }

  // customLogger("userDATA");
  // customLogger(userData);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 7 * 1000);
  const session = await encrypt({ data: userData, expires });

  res.cookies.set("session", session, { expires, httpOnly: true });
  const clonedRequest = req.clone();
  clonedRequest.headers.append("x-user-data", JSON.stringify(userData));
  // clonedRequest.user = userData;

  // set cookies on cloned request so they are available with cookies() on first load
  const response = NextResponse.rewrite(req.nextUrl.toString(), {
    request: clonedRequest,
  });
  return response;
}
