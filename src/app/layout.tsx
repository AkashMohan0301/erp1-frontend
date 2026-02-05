//path: src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ProvidersClient } from "@/components/providers/ProvidersClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ProvidersClient>
            {children}
          </ProvidersClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
