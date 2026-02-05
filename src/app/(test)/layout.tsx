"use client";

// ============================
// DASHBOARD LAYOUT (Redux init)
// ============================
export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <main className="w-full h-screen flex flex-col gap-1">
          <div className="flex-1 overflow-auto">{children}</div>
        </main>

  );
}
