
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Wallet, Map, Clock, User, Users } from "lucide-react";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <nav className="container max-w-md mx-auto flex justify-between px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 text-xs ${
              isActive ? "text-eco" : "text-muted-foreground"
            }`
          }
          end
        >
          <Home size={20} />
          <span className="mt-1">Home</span>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 text-xs ${
              isActive ? "text-eco" : "text-muted-foreground"
            }`
          }
        >
          <Map size={20} />
          <span className="mt-1">Explore</span>
        </NavLink>
        <NavLink
          to="/meet"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 text-xs ${
              isActive ? "text-eco" : "text-muted-foreground"
            }`
          }
        >
          <Users size={20} />
          <span className="mt-1">Meet</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 text-xs ${
              isActive ? "text-eco" : "text-muted-foreground"
            }`
          }
        >
          <Clock size={20} />
          <span className="mt-1">History</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 text-xs ${
              isActive ? "text-eco" : "text-muted-foreground"
            }`
          }
        >
          <User size={20} />
          <span className="mt-1">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavigation;
