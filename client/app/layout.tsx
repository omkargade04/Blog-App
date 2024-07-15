import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/Auth";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog Website ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={2000}
          pauseWhenPageIsHidden
          visibleToasts={1}
        />
        </AuthProvider>
      </body>
    </html>
  );
}
