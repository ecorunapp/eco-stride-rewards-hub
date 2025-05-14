
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

const AppLayout: React.FC = () => {
  // Use this to check if auth is working - if it throws an error, we'll know that's where the problem is
  try {
    // Just test the hook to make sure it's available
    useAuth();
  } catch (error) {
    console.error("Auth context not available in AppLayout:", error);
  }
  
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
