
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coins } from "lucide-react";
import StepCounter from "@/components/home/StepCounter";
import EcoCoinsBalance from "@/components/common/EcoCoinsBalance";
import MoveMateFeature from "@/components/home/MoveMateFeature";
import { mockUser } from "@/data/mockData";
import { toast } from "sonner";

const Index = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-1">Welcome, {mockUser.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">Let's get moving today</p>
      </div>

      <div className="relative">
        <StepCounter steps={steps} goal={goal} />
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <Button 
            onClick={handleStartStop} 
            variant={isWalking ? "destructive" : "default"}
            className={isWalking ? "bg-red-500 hover:bg-red-600" : "bg-eco hover:bg-eco-dark"}
            size="lg"
          >
            {isWalking ? "Stop Tracking" : "Start Tracking"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Today's Goal</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              <div className="text-lg font-medium flex justify-between">
                {Math.round(goalCompletion)}% Complete
              </div>
              <Progress value={goalCompletion} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Earned Today</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <EcoCoinsBalance balance={coinsToday} size="lg" showLabel={false} />
          </CardContent>
        </Card>
      </div>

      {/* MoveMate+ Feature */}
      <MoveMateFeature />
    </div>
  );
};

export default Index;
