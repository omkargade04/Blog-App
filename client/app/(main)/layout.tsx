"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/Auth";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AuthProvider>
        <Navbar />
        <div className="min-h-screen p-6">{children}</div>
        {/* <Footer /> */}
      </AuthProvider>
    </div>
  );
};

export default MainLayout;
