// src/app/api/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";

const BACKEND_API = process.env.BACKEND_API_URL!;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path = [] } = await context.params;

  const search = req.nextUrl.search;

  const backendUrl =
    `${BACKEND_API}/api/${path.join("/")}${search}`;

  const backendRes = await fetch(backendUrl, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers.entries()),
      host: undefined as any, // prevent host override issues
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

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
