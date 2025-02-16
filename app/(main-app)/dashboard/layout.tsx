"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppSidebar } from "@/components/AppSideBar";
import NavBar from "@/components/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {

  const path = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`w-full grow bg-gray-100 `}>
        {path !== "/dashboard/user" && <NavBar />}

        <div className={path !== "/dashboard/user" ? "p-5" :''}>{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
