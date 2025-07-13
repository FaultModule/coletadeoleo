import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect("/login");

  // Apagar o cookie 'token'
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
