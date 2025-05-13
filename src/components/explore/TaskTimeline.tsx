
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Timer, CircleCheck, Navigation, CheckCircle, Package, Gift, Lock } from "lucide-react";
import { toast } from "sonner";
import { ActiveTask } from "./TaskDetailDialog";
import TaskNavigationView from "./TaskNavigationView";

const TaskTimeline: React.FC = () => {
  const [activeTask, setActiveTask] = useState<ActiveTask | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  
  // Load completed tasks count from local storage
  useEffect(() => {
    const storedCount = localStorage.getItem("ecoDropCompletedTasks");
    if (storedCount) {
      setCompletedTasks(parseInt(storedCount));
    }
  }, []);
  
  const stages = [
    { name: "Pick Up", icon: <Package className="h-4 w-4" />, complete: false },
    { name: "In Transit", icon: <Navigation className="h-4 w-4" />, complete: false },
    { name: "Delivery", icon: <MapPin className="h-4 w-4" />, complete: false },
    { name: "Complete", icon: <CircleCheck className="h-4 w-4" />, complete: false },
  ];
  
  useEffect(() => {
    // Load active task from local storage if it exists
    const storedTask = localStorage.getItem("ecoDropActiveTask");
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask) as ActiveTask;
      if (parsedTask.status === "in-progress") {
        setActiveTask(parsedTask);
      }
    }
    
    // Set up interval to update elapsed time
    const interval = setInterval(() => {
      if (activeTask) {
        const timeElapsed = Math.floor((Date.now() - activeTask.startTime) / 1000); // in seconds
        setElapsedTime(timeElapsed);
        
        // Parse estimated time to calculate progress
        const estimatedMinutes = parseEstimatedTime(activeTask.estimatedTime);
        const estimatedSeconds = estimatedMinutes * 60;
        const calculatedProgress = Math.min((timeElapsed / estimatedSeconds) * 100, 100);
        setProgress(calculatedProgress);
        
        // Update the current stage based on progress
        if (calculatedProgress < 25) {
          setCurrentStage(0);
        } else if (calculatedProgress < 50) {
          setCurrentStage(1);
        } else if (calculatedProgress < 75) {
          setCurrentStage(2);
        } else {
          setCurrentStage(3);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [activeTask]);
  
  const parseEstimatedTime = (estimatedTime: string): number => {
    // Parse formats like "15-20 min" to get the higher value
    const match = estimatedTime.match(/(\d+)-(\d+)/);
    if (match) {
      return parseInt(match[2], 10);
    }
    return 20; // default to 20 minutes if parsing fails
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleCompleteTask = () => {
    if (activeTask) {
      // Update task status
      const updatedTask = { ...activeTask, status: "completed" };
      localStorage.setItem("ecoDropActiveTask", JSON.stringify(updatedTask));
      
      // Increment completed tasks count and save to local storage
      const newCompletedCount = completedTasks + 1;
      setCompletedTasks(newCompletedCount);
      localStorage.setItem("ecoDropCompletedTasks", newCompletedCount.toString());
      
      // Show success toast for unlocking a gift card if applicable
      if (newCompletedCount === 1 || newCompletedCount === 3 || newCompletedCount === 5 || newCompletedCount === 7) {
        toast.success(`You've unlocked a new Flight Reward Card!`, {
          description: "Visit your wallet to view your rewards",
          icon: <Gift className="h-5 w-5" />
        });
      }
      
      // Show success toast and clear active task
      toast.success(`Task completed! You earned ${activeTask.coins} ecoCoins`, {
        description: `Great job delivering from ${activeTask.storeName}`
      });
      
      setActiveTask(null);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  if (!activeTask) {
    // When no active task, just show a message to start a task
    return (
      <Card className="border-purple-300 dark:border-purple-800 mt-6">
        <CardContent className="p-4">
          <div className="text-center py-6">
            <CircleCheck className="h-12 w-12 text-purple-500 mx-auto mb-3 opacity-40" />
            <h3 className="font-semibold mb-2">No Active Tasks</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start an EcoDrop task to see your progress here
            </p>
            <div className="text-sm text-purple-600">
              {completedTasks} tasks completed so far
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={`border-purple-300 dark:border-purple-800 fixed ${isExpanded ? 'top-4 bottom-20' : 'bottom-20'} left-4 right-4 z-20 shadow-lg transition-all duration-300`}>
      <CardContent className={`p-3 ${isExpanded ? 'h-full flex flex-col' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-medium">{activeTask.storeName}</h3>
            <div className="flex items-center text-xs text-slate-500">
              <MapPin className="h-3 w-3 mr-1" /> {activeTask.distance} km
            </div>
          </div>
          
          <div>
            <div className="flex items-center text-xs font-medium">
              <Timer className="h-3 w-3 mr-1 text-purple-500" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
            <div className="text-xs text-purple-500 text-right">
              {activeTask.estimatedTime}
            </div>
          </div>
        </div>
        
        <Progress value={progress} className="h-2 mb-2 bg-purple-100 dark:bg-purple-900/20">
          <div 
            className="h-full bg-purple-500" 
            style={{ width: `${progress}%` }}
          />
        </Progress>

        <div className="flex items-center justify-between mb-2">
          {stages.map((stage, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${
                index === currentStage ? 'text-purple-600' : 
                index < currentStage ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              <div className={`rounded-full p-1 ${
                index === currentStage ? 'bg-purple-100 border border-purple-300' : 
                index < currentStage ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {index < currentStage ? <CheckCircle className="h-4 w-4" /> : stage.icon}
              </div>
              <span className="text-[10px] mt-1">{stage.name}</span>
            </div>
          ))}
        </div>
        
        {isExpanded && (
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-md mb-2 overflow-hidden relative">
            <TaskNavigationView 
              destination={activeTask.storeName}
              distance={activeTask.distance}
              expanded={true}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Button 
            size="sm" 
            variant="outline"
            onClick={toggleExpand} 
            className="h-7 text-xs"
          >
            {isExpanded ? "Hide Map" : "Show Map"}
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleCompleteTask} 
            className="h-7 text-xs bg-purple-600 hover:bg-purple-700"
          >
            <CircleCheck className="h-3 w-3 mr-1" />
            Complete Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeline;
