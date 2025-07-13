import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.set('token', '', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
  });
  return response;
}
