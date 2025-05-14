
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CardDesignCarousel from "./CardDesignCarousel";
import EcoTabCard from "./EcoTabCard";
import { ArrowRight, CreditCard, Package } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CardDesign {
  id: string;
  name: string;
  gradient: string;
  cardNumber: string;
  userName: string;
}

interface CardActivationFlowProps {
  userName: string;
  onComplete: (selectedCard: CardDesign) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CardActivationFlow: React.FC<CardActivationFlowProps> = ({ 
  userName, 
  onComplete,
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [selectedCard, setSelectedCard] = useState<CardDesign | null>(null);
  const [cardInEnvelope, setCardInEnvelope] = useState(false);
  
  const handleSelectCard = (card: CardDesign) => {
    setSelectedCard(card);
    setStep(2);
  };
  
  const handleActivate = () => {
    toast.success("Card successfully activated!");
    if (selectedCard) {
      onComplete(selectedCard);
    }
    onClose();
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step === 2) {
        setCardInEnvelope(true);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {step === 1 && "Choose a Card Design"}
            {step === 2 && "Activate Your EcoTab Card"}
            {step === 3 && "Complete Activation"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {step === 1 && (
            <CardDesignCarousel 
              onSelectCard={handleSelectCard}
              userName={userName}
            />
          )}
          
          {step === 2 && selectedCard && (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-64 perspective-1000 transition-all duration-500">
                <EcoTabCard 
                  balance={0}
                  cardNumber={selectedCard.cardNumber}
                  userName={userName}
                  className={cn(
                    "h-full shadow-lg transform transition-all duration-500",
                    selectedCard.gradient
                  )}
                />
              </div>
              
              <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30">
                <AlertDescription>
                  Ready to use your coins? Activate your EcoTab now!
                </AlertDescription>
              </Alert>
              
              <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 space-y-4 w-full">
                <div className="flex justify-between items-center">
                  <span className="font-medium">One-time activation fee:</span>
                  <span className="font-bold">AED 60</span>
                </div>
                
                <Button 
                  onClick={handleNextStep}
                  className="w-full bg-eco hover:bg-eco-dark"
                >
                  Pay & Activate
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-64 h-80 perspective-1000">
                <div 
                  className={`w-full h-full transition-all duration-1000 ${
                    cardInEnvelope ? 'translate-y-[-10%]' : ''
                  }`}
                >
                  <div className="bg-amber-100/80 dark:bg-amber-900/20 p-6 rounded-lg h-64 flex items-center justify-center">
                    <div className="relative">
                      <Package className="h-20 w-20 text-amber-700 opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CreditCard className="h-10 w-10 text-eco" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">Your card is ready!</h3>
                <p className="text-sm text-muted-foreground">
                  Your physical EcoTab card will be shipped to your address. 
                  Meanwhile, you can start using the virtual card immediately!
                </p>
                
                <Button 
                  onClick={handleActivate} 
                  className="bg-eco hover:bg-eco-dark"
                >
                  Start Using My Card
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function from utils
const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default CardActivationFlow;
