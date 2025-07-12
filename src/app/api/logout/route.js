import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(new URL("/login", "https://coletadeoleo.vercel.app"));

  // Apagar o cookie 'token'
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
