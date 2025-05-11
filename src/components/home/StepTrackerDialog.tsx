
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Timer, Leaf, Coins } from "lucide-react";
import StepCounter from "@/components/home/StepCounter";
import { cn } from "@/lib/utils";

interface StepTrackerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  steps: number;
  goalSteps: number;
  ecoCoins: number;
  isWalking: boolean;
  onStartStop: () => void;
}

const StepTrackerDialog: React.FC<StepTrackerDialogProps> = ({
  isOpen,
  onClose,
  steps,
  goalSteps,
  ecoCoins,
  isWalking,
  onStartStop,
}) => {
  // Calculate CO2 savings - approximately 0.2kg per 1000 steps
  const co2Saved = (steps / 1000) * 0.2;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">EcoRun+ Tracking</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          <StepCounter steps={steps} goal={goalSteps} className="scale-90" />
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto mt-2">
            {/* CO2 Saved Card */}
            <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Leaf className="h-5 w-5 text-eco mr-1" />
                <span className="text-sm font-medium">CO₂ Saved</span>
              </div>
              <p className="text-lg font-bold">{co2Saved.toFixed(2)} kg</p>
            </div>
            
            {/* EcoCoins Earned Card */}
            <div className="flex flex-col items-center justify-center bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Coins className="h-5 w-5 text-coin mr-1" />
                <span className="text-sm font-medium">EcoCoins</span>
              </div>
              <p className="text-lg font-bold">{ecoCoins}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mt-4 w-full">
            <Button 
              onClick={onStartStop}
              variant={isWalking ? "destructive" : "default"}
              className={cn(
                "flex-1 max-w-xs",
                isWalking 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-eco hover:bg-eco-dark"
              )}
            >
              {isWalking ? "Pause Tracking" : "Resume Tracking"}
            </Button>
            
            {isWalking ? null : (
              <Button 
                onClick={onClose}
                variant="outline"
                className="flex-1 max-w-xs"
              >
                Finish
              </Button>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground text-center mt-2">
            <Timer className="inline h-3 w-3 mr-1" />
            Keep tracking to earn more ecoCoins
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StepTrackerDialog;
