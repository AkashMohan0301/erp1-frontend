//path: src/app/layout.tsx
import { PopupProvider } from "@/components/popupDialog/PopupProvider";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ProvidersClient } from "@/components/providers/providersClient";
export const metadata = {
  title: "ERP1",
  description: "ERP System",
  manifest: "/manifest.json",
};
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
            <PopupProvider>

            {children}
            </PopupProvider>
          </ProvidersClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
