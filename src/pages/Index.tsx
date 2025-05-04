
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Wallet, Package, Award, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EcoCoinsBalance from "@/components/common/EcoCoinsBalance";
import { mockUser } from "@/data/mockData";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(mockUser.totalSteps);
  const [ecoCoins, setEcoCoins] = useState(mockUser.ecoCoins);
  const [isWalking, setIsWalking] = useState(false);
  const goal = mockUser.dailyGoal;
  const goalCompletion = Math.min((steps / goal) * 100, 100);
  
  // This simulates a step counter
  useEffect(() => {
    let interval: number | null = null;
    
    if (isWalking) {
      interval = window.setInterval(() => {
        setSteps(prevSteps => {
          const newSteps = prevSteps + Math.floor(Math.random() * 5) + 1;
          
          // For every 100 steps, earn 1 ecoCoin
          if (Math.floor(newSteps / 100) > Math.floor(prevSteps / 100)) {
            const newCoins = Math.floor(newSteps / 100) - Math.floor(prevSteps / 100);
            setEcoCoins(prevCoins => prevCoins + newCoins);
            toast(`Earned ${newCoins} ecoCoins!`, {
              icon: <Coins size={18} className="text-coin" />,
            });
          }
          
          return newSteps;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isWalking]);

  const handleStartStop = () => {
    setIsWalking(!isWalking);
  };

  const coinsToday = Math.floor(steps / 100);

  // Feature navigation handlers
  const handleEcoRunClick = () => {
    // For now we'll just show a tracking dialog on the home page
    setIsWalking(!isWalking);
  };
  
  const handleEcoTabClick = () => {
    navigate("/wallet");
  };
  
  const handleEcoDropClick = () => {
    navigate("/explore");
  };
  
  const handleRunfluenceClick = () => {
    navigate("/meet");
  };

  return (
    <div className="space-y-5">
      {/* Summary Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-lg font-bold">Welcome, {mockUser.name.split(" ")[0]}!</h1>
              <p className="text-xs text-muted-foreground">Let's get moving today</p>
            </div>
            <EcoCoinsBalance balance={ecoCoins} size="md" />
          </div>
          
          <div className="space-y-1.5 mt-1">
            <div className="flex justify-between text-xs">
              <span>Daily Goal: {steps.toLocaleString()} / {goal.toLocaleString()} steps</span>
              <span className="font-medium">{Math.round(goalCompletion)}%</span>
            </div>
            <Progress value={goalCompletion} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* EcoRun+ */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-all border-eco/20 overflow-hidden"
          onClick={handleEcoRunClick}
        >
          <CardContent className="p-0">
            <div className="bg-eco/10 p-4 flex items-center justify-center">
              <div className="bg-eco rounded-full p-3">
                <Activity className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold">EcoRun+</h3>
              <p className="text-xs text-muted-foreground mt-1">Track steps, earn rewards</p>
              <div className="mt-3 flex justify-center">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartStop();
                  }} 
                  variant={isWalking ? "destructive" : "default"}
                  className={isWalking ? "bg-red-500 hover:bg-red-600 text-xs" : "bg-eco hover:bg-eco-dark text-xs"}
                  size="sm"
                >
                  {isWalking ? "Stop Tracking" : "Start Tracking"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EcoTab Card */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-all border-coin/20 overflow-hidden"
          onClick={handleEcoTabClick}
        >
          <CardContent className="p-0">
            <div className="bg-coin/10 p-4 flex items-center justify-center">
              <div className="bg-coin rounded-full p-3">
                <Wallet className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold">EcoTab Card</h3>
              <p className="text-xs text-muted-foreground mt-1">Digital wallet & rewards</p>
              <div className="mt-3 flex justify-center">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEcoTabClick();
                  }}
                  variant="outline" 
                  className="border-coin text-coin-dark text-xs"
                  size="sm"
                >
                  View Wallet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EcoDrop+ */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-all border-purple-200/50 dark:border-purple-900/30 overflow-hidden"
          onClick={handleEcoDropClick}
        >
          <CardContent className="p-0">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 flex items-center justify-center">
              <div className="bg-purple-500 rounded-full p-3">
                <Package className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold">EcoDrop+</h3>
              <p className="text-xs text-muted-foreground mt-1">Local tasks & deliveries</p>
              <div className="mt-3 flex justify-center">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEcoDropClick();
                  }}
                  variant="outline" 
                  className="border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs"
                  size="sm"
                >
                  Find Tasks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Runfluence+ */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-all border-indigo-200/50 dark:border-indigo-900/30 overflow-hidden"
          onClick={handleRunfluenceClick}
        >
          <CardContent className="p-0">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 flex items-center justify-center">
              <div className="bg-indigo-500 rounded-full p-3">
                <Award className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold">Runfluence+</h3>
              <p className="text-xs text-muted-foreground mt-1">Creator platform & challenges</p>
              <div className="mt-3 flex justify-center">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRunfluenceClick();
                  }}
                  variant="outline" 
                  className="border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs"
                  size="sm"
                >
                  View Platform
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
