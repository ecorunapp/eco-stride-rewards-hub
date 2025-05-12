
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import EcoTabCard from "@/components/wallet/EcoTabCard";
import EcoCoinsBalance from "@/components/common/EcoCoinsBalance";
import { mockUser, mockTransactions, mockGiftCards } from "@/data/mockData";
import { format } from "date-fns";
import EcoTabActivationDialog from "@/components/wallet/EcoTabActivationDialog";
import GiftCard from "@/components/wallet/GiftCard";
import { Gift, Wallet as WalletIcon, Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Wallet = () => {
  const [balance, setBalance] = useState(mockUser.ecoCoins);
  const [cardBalance, setCardBalance] = useState(200); // Example starting card balance
  const [transferAmount, setTransferAmount] = useState(50);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [isCardActivated, setIsCardActivated] = useState(true); // Set to false to require activation
  const [completedTasks, setCompletedTasks] = useState(0);

  // Load completed tasks count from local storage
  React.useEffect(() => {
    const storedCount = localStorage.getItem("ecoDropCompletedTasks");
    if (storedCount) {
      setCompletedTasks(parseInt(storedCount));
    }
  }, []);

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

  const handleCardClick = () => {
    setIsCardDialogOpen(true);
  };

  const handleActivateCard = () => {
    // Here you would typically process a payment of 60 AED
    toast.success("Card purchase successful! Your EcoTab Card is now active.");
    setIsCardActivated(true);
  };

  // Enhanced gift cards with flight ticket data
  const enhancedGiftCards = mockGiftCards.map(card => {
    const destinations = {
      "Starbucks": { origin: "DXB", destination: "PAR", color: "#FF719A", date: "12 Jun 2024" },
      "Amazon": { origin: "JFK", destination: "LHR", color: "#6E59A5", date: "18 Jun 2024" },
      "Nike": { origin: "SFO", destination: "TYO", color: "#FEF7CD", date: "24 Jul 2024" },
      "Spotify": { origin: "LAX", destination: "SYD", color: "#9b87f5", date: "02 Aug 2024" }
    };
    
    const cardInfo = destinations[card.name] || { 
      origin: card.name.substring(0, 3).toUpperCase(), 
      destination: "ECO", 
      color: card.backgroundColor,
      date: "16 Jun 2024"
    };
    
    return {
      ...card,
      backgroundColor: cardInfo.color || card.backgroundColor,
      origin: cardInfo.origin,
      destination: cardInfo.destination,
      date: cardInfo.date,
      details: {
        terminal: "T" + Math.floor(Math.random() * 5 + 1),
        seat: String.fromCharCode(65 + Math.floor(Math.random() * 6)) + Math.floor(Math.random() * 30 + 1),
        gate: String.fromCharCode(65 + Math.floor(Math.random() * 12)) + Math.floor(Math.random() * 10)
      }
    };
  });

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your ecoCoins</p>
      </div>
      
      <Tabs defaultValue="balance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="balance">
            <WalletIcon className="h-4 w-4 mr-2" />
            Balance
          </TabsTrigger>
          <TabsTrigger value="ecotab">
            <WalletIcon className="h-4 w-4 mr-2" />
            EcoTab Card
          </TabsTrigger>
          <TabsTrigger value="gifts">
            <Ticket className="h-4 w-4 mr-2" />
            Flight Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="balance">
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
                    disabled={!isCardActivated}
                  >
                    Transfer
                  </button>
                </div>
                
                {!isCardActivated && (
                  <div className="text-xs text-amber-600 mb-4">
                    You need to activate your EcoTab Card first
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="pt-6">
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
        </TabsContent>

        <TabsContent value="ecotab">
          <div>
            <div onClick={handleCardClick} className="cursor-pointer">
              <EcoTabCard 
                balance={cardBalance} 
                cardNumber={mockUser.ecotabCardNumber}
                userName={mockUser.name}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {isCardActivated 
                ? "Use your EcoTab Card at partner stores to redeem rewards"
                : "Activate your card to start using it at partner stores"}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="gifts">
          <div>
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <Ticket className="h-5 w-5 text-purple-500" />
                  <span>Your Flight Rewards</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">
                    Complete eco-friendly tasks to unlock flight rewards
                  </p>
                  <div className="text-sm text-purple-600 font-medium">
                    {completedTasks} tasks completed
                  </div>
                </div>

                <div className="grid gap-4">
                  {enhancedGiftCards.map((card) => (
                    <GiftCard 
                      key={card.id} 
                      card={{
                        ...card,
                        isUnlocked: completedTasks >= card.requiredCompletions
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
              <h3 className="font-medium mb-2">How to redeem your flight rewards</h3>
              <p className="text-sm text-muted-foreground">
                Complete eco-friendly tasks to unlock flight reward tickets. 
                Present these digital tickets at partner locations or scan the QR code at kiosks to claim your rewards.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <EcoTabActivationDialog
        isOpen={isCardDialogOpen}
        onClose={() => setIsCardDialogOpen(false)}
        cardBalance={cardBalance}
        ecoCoinsBalance={balance}
        onPurchase={handleActivateCard}
        isActivated={isCardActivated}
      />
    </div>
  );
};

export default Wallet;
