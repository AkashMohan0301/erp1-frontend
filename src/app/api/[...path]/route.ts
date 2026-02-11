// src/app/api/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";

const BACKEND_API = process.env.BACKEND_API_URL!;
// Example: http://localhost:5168

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path = [] } = await context.params;

  // Build backend URL
  const url = `${BACKEND_API}/api/${path.join("/")}`;

  const backendRes = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",

      // Forward cookies (auth)
      cookie: req.headers.get("cookie") ?? "",

      // Forward CSRF
      "X-CSRF-Token": req.headers.get("x-csrf-token") ?? "",

      // Forward Unit context
      "X-UNIT-ID": req.headers.get("x-unit-id") ?? "",
    },
    body:
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : await req.text(),
    redirect: "manual",
  });

  return new NextResponse(backendRes.body, {
    status: backendRes.status,
    headers: backendRes.headers,
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
