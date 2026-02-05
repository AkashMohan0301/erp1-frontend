//path src/app/api/auth/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API = process.env.BACKEND_API_URL!;
// example: http://10.143.169.39:5168/api

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  // 🔑 IMPORTANT: params IS A PROMISE
  const { path = [] } = await context.params;

  const url = `${BACKEND_API}/api/auth/${path.join("/")}`;

const backendRes = await fetch(url, {
  method: req.method,
  headers: {
    "Content-Type": "application/json",

    // forward cookies (auth)
    cookie: req.headers.get("cookie") ?? "",

    // 🔐 forward CSRF header explicitly
    "X-CSRF-Token": req.headers.get("x-csrf-token") ?? "",
  },
  body:
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await req.text(),
  redirect: "manual",
});

  // Forward backend response (including Set-Cookie)
  return new NextResponse(backendRes.body, {
    status: backendRes.status,
    headers: backendRes.headers,
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
