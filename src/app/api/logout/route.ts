import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 1. constrói https://<domínio-atual>/login
  const loginUrl = new URL("/login", req.url);

  // 2. faz o redirect usando a URL absoluta
  const response = NextResponse.redirect(loginUrl);  // 307 por padrão

  // 3. apaga o cookie
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
