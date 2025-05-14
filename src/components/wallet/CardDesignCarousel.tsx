
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import EcoTabCard from "./EcoTabCard";
import { toast } from "sonner";

interface CardDesign {
  id: string;
  name: string;
  gradient: string;
  cardNumber: string;
  userName: string;
}

interface CardDesignCarouselProps {
  onSelectCard: (card: CardDesign) => void;
  userName: string;
}

const CardDesignCarousel: React.FC<CardDesignCarouselProps> = ({ 
  onSelectCard,
  userName
}) => {
  const [selectedCard, setSelectedCard] = useState<CardDesign | null>(null);
  const [cardRotation, setCardRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Sample card designs with different gradients
  const cardDesigns: CardDesign[] = [
    {
      id: "purple-pink",
      name: "Aurora",
      gradient: "bg-gradient-to-br from-purple-600 to-pink-500",
      cardNumber: "0801 0420 2407 0159",
      userName
    },
    {
      id: "green-blue",
      name: "Ocean",
      gradient: "bg-gradient-to-br from-green-400 to-blue-500",
      cardNumber: "0801 0420 2407 0159",
      userName
    },
    {
      id: "blue-teal",
      name: "Skyline",
      gradient: "bg-gradient-to-br from-blue-500 to-teal-400",
      cardNumber: "0801 0420 2407 0159",
      userName
    },
    {
      id: "orange-red",
      name: "Sunset",
      gradient: "bg-gradient-to-br from-orange-400 to-red-500",
      cardNumber: "0801 0420 2407 0159",
      userName
    },
    {
      id: "eco-default",
      name: "EcoTab Classic",
      gradient: "bg-gradient-to-br from-eco to-eco-dark",
      cardNumber: "0801 0420 2407 0159",
      userName
    }
  ];

  useEffect(() => {
    // Set the default card
    if (!selectedCard && cardDesigns.length > 0) {
      setSelectedCard(cardDesigns[0]);
    }
  }, []);

  // Handle mouse/touch down for 3D rotation effect
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  // Handle mouse/touch move for 3D rotation
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    
    // Convert the delta to rotation degrees (limited range)
    const newRotation = Math.max(-30, Math.min(30, deltaX / 5));
    setCardRotation(newRotation);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    // Animate back to center
    setCardRotation(0);
  };

  const handleSelectCard = () => {
    if (selectedCard) {
      toast.success(`${selectedCard.name} card selected!`);
      onSelectCard(selectedCard);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      <h2 className="text-2xl font-bold">Choose Your Card Design</h2>
      
      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {cardDesigns.map((card) => (
              <CarouselItem key={card.id} className="flex justify-center">
                <div 
                  className={cn(
                    "relative perspective-1000 w-64 h-96 transition-all duration-300 cursor-pointer",
                    selectedCard?.id === card.id ? "scale-105" : "scale-90 opacity-90"
                  )}
                  onClick={() => setSelectedCard(card)}
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDragMove}
                  onTouchEnd={handleDragEnd}
                  style={{
                    transform: `rotateY(${cardRotation}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: isDragging ? 'none' : 'transform 0.5s ease'
                  }}
                >
                  <div className="w-full h-full">
                    <EcoTabCard 
                      balance={0}
                      cardNumber={card.cardNumber}
                      userName={card.userName}
                      className={cn(
                        "h-full shadow-lg",
                        card.gradient
                      )}
                    />
                  </div>
                  
                  {selectedCard?.id === card.id && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10">
                      <Check className="h-5 w-5 text-eco" />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </Carousel>
      </div>
      
      {selectedCard && (
        <div className="text-center">
          <p className="text-lg font-medium mb-2">{selectedCard.name}</p>
          <Button onClick={handleSelectCard} className="bg-eco hover:bg-eco-dark mt-4">
            Select This Card
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardDesignCarousel;
