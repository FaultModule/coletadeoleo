import { NextResponse } from "next/server";

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const loginUrl = new URL("/login", baseUrl);

  const response = NextResponse.redirect(loginUrl);

  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
