
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import EcoCoinsBalance from "../common/EcoCoinsBalance";

interface EcoTabCardProps {
  balance: number;
  cardNumber: string;
  userName: string;
  className?: string;
}

const EcoTabCard: React.FC<EcoTabCardProps> = ({
  balance,
  cardNumber,
  userName,
  className,
}) => {
  // Format card number with spaces (like credit card)
  const formattedCardNumber = cardNumber
    .replace(/\s/g, "")
    .match(/.{1,4}/g)
    ?.join(" ") || cardNumber;

  return (
    <Card
      className={cn(
        "overflow-hidden bg-gradient-to-br from-eco to-eco-dark text-white",
        className
      )}
    >
      <CardContent className="p-5 relative">
        <div className="absolute top-0 right-0 left-0 h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-xs uppercase tracking-wider text-white/70 mb-1">EcoTab Card</div>
          <EcoCoinsBalance 
            balance={balance} 
            size="lg" 
            showLabel={true} 
            className="text-white mb-6" 
          />
          
          <div className="mt-6 flex flex-col gap-2">
            <div className="font-mono text-base tracking-wider">
              {formattedCardNumber}
            </div>
            <div className="text-sm text-white/80">{userName}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoTabCard;
