
import React from "react";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface EcoCoinsBalanceProps {
  balance: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const EcoCoinsBalance: React.FC<EcoCoinsBalanceProps> = ({
  balance,
  size = "md",
  showLabel = true,
  className,
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 font-medium text-coin-dark",
        sizeClasses[size],
        className
      )}
    >
      <Coins size={iconSizes[size]} className="text-coin" />
      <span>
        {balance.toLocaleString()} {showLabel && "ecoCoins"}
      </span>
    </div>
  );
};

export default EcoCoinsBalance;
