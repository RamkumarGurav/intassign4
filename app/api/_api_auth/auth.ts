import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function sendCookie(data: any, seconds: number) {
  if (data == null && seconds == 0) {
    cookies().set("session", "", { expires: new Date(0) });
    // logger("empty cookie");
  } else {
    const expires = new Date(Date.now() + seconds * 1000);
    const session = await encrypt({ data: data, expires });

    // Save the session in a cookie
    cookies().set("session", session, {
      expires,
      httpOnly: true,
      sameSite: true,
      path: "/",
    });
    // logger("solid cookie");
  }
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
