import { getToken } from "@auth/core/jwt"; // 👈 Auth.js usa este path
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET, // 👈 Requerido en entornos Edge
  });

  if (!token) {
    console.log("🔐 Usuario no autenticado, redirigiendo a /login");
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  console.log("✅ Usuario autenticado:", token.email);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Solo protegerá /dashboard
};
