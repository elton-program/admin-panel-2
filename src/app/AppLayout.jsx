"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/sidebar/Sidebar";
import Header from "@/app/navbar/Navbar";
import "./dashboard/dashboard.css";
import "./AppLayout.css";
export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

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
