
import type { Metadata } from "next";
import { PT_Sans } from "next/font/google"; // Changed from Inter to PT_Sans
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeInitializer } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error-boundary";
  subsets: ["latin"],
  weight: ["400", "700"] // Include weights you need
});

export const metadata: Metadata = {
  title: "MyBase App", // Corrected App Name if necessary
  description: "The ultimate taxi app solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/chunk-error-handler.js" defer></script>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={ptSans.className} suppressHydrationWarning>
            <ThemeInitializer>
              <Toaster />
              {children}
            </ThemeInitializer>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
