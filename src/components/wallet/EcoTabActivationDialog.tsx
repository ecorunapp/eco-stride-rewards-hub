
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";
import EcoCoinsBalance from "@/components/common/EcoCoinsBalance";

interface EcoTabActivationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cardBalance: number;
  ecoCoinsBalance: number;
  onPurchase: () => void;
  isActivated: boolean;
}

const EcoTabActivationDialog: React.FC<EcoTabActivationDialogProps> = ({
  isOpen,
  onClose,
  cardBalance,
  ecoCoinsBalance,
  onPurchase,
  isActivated
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">EcoTab Card Details</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="w-full bg-gradient-to-br from-eco to-eco-dark text-white p-5 rounded-xl mb-2 shadow-md">
            <div className="text-xs uppercase tracking-wider text-white/70 mb-1">Card Balance</div>
            <div className="text-2xl font-bold">{cardBalance} AED</div>
            
            <div className="mt-4 text-xs text-white/70">Available EcoCoins</div>
            <EcoCoinsBalance balance={ecoCoinsBalance} size="md" showLabel={true} className="text-white" />
          </div>
          
          {!isActivated ? (
            <div className="text-center space-y-4 w-full">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-sm">
                  Activate your EcoTab Card to use earned ecoCoins at partner stores and vending machines.
                </p>
                <p className="font-bold mt-2">
                  Purchase price: 60 AED
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-slate-600 dark:text-slate-300 mb-1" />
                  <span className="text-xs font-medium">Physical Card</span>
                </div>
                <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <Wallet className="h-6 w-6 text-slate-600 dark:text-slate-300 mb-1" />
                  <span className="text-xs font-medium">Virtual Card</span>
                </div>
              </div>
              
              <Button 
                onClick={onPurchase}
                className="w-full bg-eco hover:bg-eco-dark"
              >
                Purchase Card (60 AED)
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4 w-full">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm">
                  Your EcoTab Card is active and ready to use at partner stores and vending machines.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-eco mb-1" />
                  <span className="text-xs font-medium">Physical Card</span>
                  <span className="text-xs text-eco">Active</span>
                </div>
                <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <Wallet className="h-6 w-6 text-eco mb-1" />
                  <span className="text-xs font-medium">Virtual Card</span>
                  <span className="text-xs text-eco">Active</span>
                </div>
              </div>
              
              <Button 
                onClick={onClose}
                className="w-full"
                variant="outline"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EcoTabActivationDialog;
