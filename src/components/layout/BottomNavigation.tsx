
import React from "react";
import { NavLink } from "react-router-dom";
import { Activity, Coins, MapPin, Route, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    to: "/",
    icon: Activity,
    label: "Home",
  },
  {
    to: "/wallet",
    icon: Coins,
    label: "Wallet",
  },
  {
    to: "/explore",
    icon: MapPin,
    label: "Explore",
  },
  {
    to: "/history",
    icon: Route,
    label: "History",
  },
  {
    to: "/profile",
    icon: User,
    label: "Profile",
  },
];

const BottomNavigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-between items-center py-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "text-eco-dark font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    className={cn(
                      isActive ? "text-eco" : "text-muted-foreground"
                    )}
                  />
                  <span className="text-xs mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
