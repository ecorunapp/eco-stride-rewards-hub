
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Wallet from "./pages/Wallet";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Meet from "./pages/Meet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="explore" element={<Explore />} />
              <Route path="history" element={<History />} />
              <Route path="profile" element={<Profile />} />
              <Route path="meet" element={<Meet />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
