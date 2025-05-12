
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GiftCardType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isUnlocked: boolean;
  requiredCompletions: number;
  backgroundColor: string;
  textColor: string;
}

interface GiftCardProps {
  card: GiftCardType;
  className?: string;
  onClick?: () => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ card, className, onClick }) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105",
        className
      )}
      onClick={onClick}
      style={{ backgroundColor: card.backgroundColor }}
    >
      <CardContent className="p-0 relative">
        <img 
          src={card.imageUrl} 
          alt={card.name} 
          className="w-full h-40 object-cover opacity-80"
        />
        
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {!card.isUnlocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <Lock className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-white text-sm">
                  Complete {card.requiredCompletions} tasks to unlock
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-start">
            <h3 
              className={cn(
                "font-bold text-xl",
                card.textColor || "text-white"
              )}
            >
              {card.name}
            </h3>
            <Gift className={cn("h-5 w-5", card.textColor || "text-white")} />
          </div>
          
          <div className={cn("text-sm", card.textColor || "text-white opacity-80")}>
            {card.isUnlocked ? "Unlocked" : "Locked"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftCard;
