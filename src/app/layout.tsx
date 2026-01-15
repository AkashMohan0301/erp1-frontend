//path: src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ProvidersClient } from "@/components/providers/providersClient";
import { ProvidersServer } from "@/components/providers/providersServer";

export const metadata: Metadata = {
  title: "ERP1 - Enterprise Resource Planning",
  description: "Professional ERP dashboard application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme sync script - runs BEFORE paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
          key="theme-script"
        />
      </head>
      <body>
          <ProvidersClient>{children}</ProvidersClient>
      </body>
    </html>
  );
}
