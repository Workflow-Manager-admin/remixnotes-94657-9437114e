import React from "react";
import { Outlet } from "@remix-run/react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { FloatingAddButton } from "./FloatingAddButton";

// PUBLIC_INTERFACE
export const AppLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 pt-8 pb-[92px] sm:pb-8 bg-white">
          <Outlet />
        </main>
      </div>
      <FloatingAddButton />
    </div>
  );
};
