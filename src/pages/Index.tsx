import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Wallet, Package, Award, Coins, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EcoCoinsBalance from "@/components/common/EcoCoinsBalance";
import { mockUser } from "@/data/mockData";
import { toast } from "sonner";
import StepTrackerDialog from "@/components/home/StepTrackerDialog";
import EcoDropTasksDialog from "@/components/explore/EcoDropTasksDialog";
import TaskTimeline from "@/components/explore/TaskTimeline";
import { stepDetectionService } from "@/services/StepDetectionService";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [steps, setSteps] = useState(0);
  const [ecoCoins, setEcoCoins] = useState(mockUser.ecoCoins);
  const [isWalking, setIsWalking] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isTasksDialogOpen, setIsTasksDialogOpen] = useState(false);
  const [hasActiveTask, setHasActiveTask] = useState(false);
  const goal = mockUser.dailyGoal;
  const goalCompletion = Math.min((steps / goal) * 100, 100);
  
  // Listen to step changes from our service
  useEffect(() => {
    const handleStepUpdate = (newSteps: number) => {
      setSteps(newSteps);
      
      // For every 100 steps, earn 1 ecoCoin
      if (Math.floor(newSteps / 100) > Math.floor((newSteps - 1) / 100)) {
        const newCoins = 1;
        setEcoCoins(prevCoins => prevCoins + newCoins);
        toast(`Earned ${newCoins} ecoCoins!`, {
          icon: <Coins size={18} className="text-coin" />,
        });
      }
    };
    
    // Add the listener
    stepDetectionService.addStepListener(handleStepUpdate);
    
    // Clean up
    return () => {
      stepDetectionService.removeStepListener(handleStepUpdate);
    };
  }, []);
  
  // Start or stop step tracking based on isWalking state
  useEffect(() => {
    if (isWalking) {
      try {
        // Try to use real sensors first
        const result = stepDetectionService.startListening();
        
        // Fall back to simulation if needed
        if (!result) {
          stepDetectionService.startSimulation();
        }
      } catch (error) {
        console.error("Error starting step detection:", error);
        // Fall back to simulation
        stepDetectionService.startSimulation();
      }
    } else {
      stepDetectionService.stopListening();
    }
  }, [isWalking]);

  // Check if there's an active task
  useEffect(() => {
    const storedTask = localStorage.getItem("ecoDropActiveTask");
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      if (parsedTask.status === "in-progress") {
        setHasActiveTask(true);
      } else {
        setHasActiveTask(false);
      }
    } else {
      setHasActiveTask(false);
    }
  }, []);

  const handleStartStop = () => {
    setIsWalking(!isWalking);
    if (!isWalking && !isTrackerOpen) {
      setIsTrackerOpen(true);
    }
  };

  const handleCloseTracker = () => {
    setIsTrackerOpen(false);
    setIsWalking(false);
  };

  const handleCloseTasksDialog = () => {
    setIsTasksDialogOpen(false);
    
    // Check if a task was started after dialog closes
    const storedTask = localStorage.getItem("ecoDropActiveTask");
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      if (parsedTask.status === "in-progress") {
        setHasActiveTask(true);
      }
    }
  };

  const coinsToday = Math.floor(steps / 100);

  // Feature navigation handlers
  const handleEcoRunClick = () => {
    // Open the tracker dialog instead of just toggling walking
    setIsTrackerOpen(true);
    if (!isWalking) {
      setIsWalking(true);
    }
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

  const handleFindTasksClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTasksDialogOpen(true);
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="space-y-5">
      {/* Summary Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-lg font-bold">Welcome, {user ? user.email?.split("@")[0] : mockUser.name.split(" ")[0]}!</h1>
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
                  onClick={handleFindTasksClick}
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

        {/* TaskDash */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-all border-green-200/50 dark:border-green-900/30 overflow-hidden"
          onClick={handleDashboardClick}
        >
          <CardContent className="p-0">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 flex items-center justify-center">
              <div className="bg-green-500 rounded-full p-3">
                <ClipboardList className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold">TaskDash</h3>
              <p className="text-xs text-muted-foreground mt-1">Manage your tasks</p>
              <div className="mt-3 flex justify-center">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDashboardClick();
                  }}
                  variant="outline" 
                  className="border-green-300 dark:border-green-800 text-green-700 dark:text-green-300 text-xs"
                  size="sm"
                >
                  {user ? "View Dashboard" : "Sign In"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step Tracker Dialog */}
      <StepTrackerDialog 
        isOpen={isTrackerOpen}
        onClose={handleCloseTracker}
        steps={steps}
        goalSteps={goal}
        ecoCoins={coinsToday}
        isWalking={isWalking}
        onStartStop={handleStartStop}
      />

      {/* EcoDrop Tasks Dialog */}
      <EcoDropTasksDialog
        isOpen={isTasksDialogOpen}
        onClose={handleCloseTasksDialog}
      />
      
      {/* Task Timeline */}
      <TaskTimeline />
    </div>
  );
};

export default Index;
