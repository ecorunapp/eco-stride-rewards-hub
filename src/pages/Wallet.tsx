
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import EcoTabCard from "@/components/wallet/EcoTabCard";
import EcoCoinsBalance from "@/components/common/EcoCoinsBalance";
import { mockUser, mockTransactions } from "@/data/mockData";
import { format } from "date-fns";

const Wallet = () => {
  const [balance, setBalance] = useState(mockUser.ecoCoins);
  const [cardBalance, setCardBalance] = useState(200); // Example starting card balance
  const [transferAmount, setTransferAmount] = useState(50);

  const handleTransfer = () => {
    if (transferAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (transferAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    setBalance(prev => prev - transferAmount);
    setCardBalance(prev => prev + transferAmount);
    
    toast.success(`Transferred ${transferAmount} ecoCoins to your EcoTab Card`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your ecoCoins</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Available Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <EcoCoinsBalance balance={balance} size="lg" showLabel={true} />
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Add ecoCoins to your EcoTab Card
            </p>
            
            <div className="flex items-center gap-3 mb-4">
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                onClick={handleTransfer}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 px-4 py-2 bg-eco text-white hover:bg-eco-dark"
              >
                Transfer
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-2">
        <h2 className="text-lg font-semibold mb-3">EcoTab Card</h2>
        <EcoTabCard 
          balance={cardBalance} 
          cardNumber={mockUser.ecotabCardNumber}
          userName={mockUser.name}
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Use your EcoTab Card at partner stores to redeem rewards
        </p>
      </div>
      
      <div className="pt-2">
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        <div className="space-y-3">
          {mockTransactions.map(tx => (
            <Card key={tx.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(tx.date, "MMM d, h:mm a")}
                    </p>
                  </div>
                  <div className={`font-semibold ${tx.type === 'earning' ? 'text-eco' : tx.type === 'redemption' ? 'text-red-500' : 'text-amber-600'}`}>
                    {tx.type === 'earning' ? '+' : '-'}{tx.amount}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
