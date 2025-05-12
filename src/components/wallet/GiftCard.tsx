
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Plane } from "lucide-react";
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
  // New flight ticket related fields
  origin?: string; 
  destination?: string;
  date?: string;
  details?: {
    terminal?: string;
    seat?: string;
    gate?: string;
  };
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
        "overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 relative",
        className
      )}
      onClick={onClick}
      style={{ backgroundColor: card.backgroundColor }}
    >
      <CardContent className="p-0 relative">
        <div className="flex flex-col h-full relative">
          {/* Main ticket content */}
          <div className="p-4 relative">
            {/* Airport codes and flight info */}
            <div className="flex justify-between items-center mb-3">
              <div className={cn("text-xl font-bold", card.textColor)}>
                {card.origin || card.name.substring(0, 3).toUpperCase()}
              </div>
              
              <div className="flex items-center px-2">
                <div className="border-t border-dashed flex-1 w-8 mx-1 opacity-60"></div>
                <Plane className={cn("h-4 w-4 mx-1 rotate-90", card.textColor)} />
                <div className="border-t border-dashed flex-1 w-8 mx-1 opacity-60"></div>
              </div>
              
              <div className={cn("text-xl font-bold", card.textColor)}>
                {card.destination || "ECO"}
              </div>
            </div>
            
            {/* Origin/Destination details */}
            <div className="flex justify-between mb-4">
              <div className={cn("text-xs", card.textColor, "opacity-80")}>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-current mr-1"></span>
                  {card.origin ? `${card.origin}` : card.name}
                </div>
              </div>
              
              <div className={cn("text-xs text-center", card.textColor, "opacity-80")}>
                {card.date || "Gift Card"}
              </div>
              
              <div className={cn("text-xs text-right", card.textColor, "opacity-80")}>
                <div className="flex items-center justify-end">
                  <span className="h-2 w-2 rounded-full bg-current mr-1"></span>
                  {card.destination ? `${card.destination}` : card.description}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom details section with the ticket "cut" */}
          {card.details && (
            <div 
              className={cn(
                "mt-1 p-3 relative", 
                card.backgroundColor === "#F2FCE2" ? "bg-green-100" : 
                card.backgroundColor === "#FEF7CD" ? "bg-yellow-100" : 
                card.backgroundColor === "#E5DEFF" ? "bg-purple-100" :
                "bg-opacity-20 bg-black"
              )}
            >
              {/* Ticket cuts */}
              <div className="absolute -top-2 left-0 h-4 w-4 rounded-full bg-white translate-x(-50%)"></div>
              <div className="absolute -top-2 right-0 h-4 w-4 rounded-full bg-white translate-x(50%)"></div>
              
              {/* Details info */}
              <div className="flex justify-between items-center">
                <div className={cn("text-xs", card.textColor)}>
                  <p className="font-semibold">Terminal: {card.details.terminal || "C1"}</p>
                </div>
                <div className={cn("text-xs", card.textColor)}>
                  <p className="font-semibold">Seat: {card.details.seat || "B12"}</p>
                </div>
                <div className={cn("text-xs", card.textColor)}>
                  <p className="font-semibold">Gate: {card.details.gate || "A"}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Lock overlay for locked cards */}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftCard;
