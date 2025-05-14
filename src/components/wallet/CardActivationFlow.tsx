
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CardDesignCarousel from "./CardDesignCarousel";
import { X } from "lucide-react";
import { toast } from "sonner";

interface CardDesign {
  id: string;
  name: string;
  gradient: string;
  cardNumber: string;
  userName: string;
}

interface CardActivationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onComplete: (cardDesign: CardDesign) => void;
}

const CardActivationFlow: React.FC<CardActivationFlowProps> = ({
  isOpen,
  onClose,
  userName,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [selectedCard, setSelectedCard] = useState<CardDesign | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectCard = (card: CardDesign) => {
    setSelectedCard(card);
    setStep(2);
  };

  const handleActivateCard = () => {
    if (!selectedCard) {
      toast.error("Please select a card design first");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete(selectedCard);
      toast.success("Your EcoTab Card is now active!");
      onClose();
      // Reset state for next time
      setStep(1);
      setSelectedCard(null);
    }, 1500);
  };

  const handleClose = () => {
    // Reset state when closing
    setStep(1);
    setSelectedCard(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg p-0 h-[85vh] max-h-[700px] flex flex-col overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {step === 1 ? "Choose Your Card Design" : "Activate Your Card"}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="flex-grow flex items-center justify-center overflow-hidden">
          {step === 1 ? (
            <div className="h-full w-full flex items-center justify-center">
              <CardDesignCarousel
                userName={userName}
                onSelectCard={handleSelectCard}
              />
            </div>
          ) : (
            <div className="p-6 h-full w-full flex flex-col items-center justify-center">
              <div className="text-center space-y-6 max-w-md">
                <h2 className="text-2xl font-bold">Ready to use your coins?</h2>
                <p className="text-muted-foreground">
                  Activate your EcoTab card now to start using your ecoCoins at partner 
                  stores and unlock exclusive rewards!
                </p>
                
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground mb-2">One-time activation fee</p>
                  <p className="text-3xl font-bold">AED 60</p>
                </div>

                <Button
                  onClick={handleActivateCard}
                  className="w-full bg-eco hover:bg-eco-dark"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay & Activate"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)} 
                  className="w-full"
                >
                  Back to Card Selection
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardActivationFlow;
