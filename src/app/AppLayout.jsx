"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/app/sidebar/Sidebar";
import Header from "@/app/navbar/Navbar";
import "./AppLayout.css";
export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token && !isLoginPage) {
      router.replace("/login");
    } else if (token && isLoginPage) {
      router.replace("/dashboard");
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="page">
      <Sidebar />
      <main className="page__main">
        <Header />
        {children}
      </main>
    </div>
  );
}
