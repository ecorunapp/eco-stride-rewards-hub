
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import { Toaster } from "@/components/ui/sonner";

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container max-w-md mx-auto px-4 pb-20 pt-6">
        <Outlet />
      </main>
      <BottomNavigation />
      <Toaster position="top-center" />
    </div>
  );
};

export default AppLayout;
