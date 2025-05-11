
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Timer, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { ActiveTask } from "./TaskDetailDialog";

const TaskTimeline: React.FC = () => {
  const [activeTask, setActiveTask] = useState<ActiveTask | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);
  
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
      
      // Show success toast and clear active task
      toast.success(`Task completed! You earned ${activeTask.coins} ecoCoins`, {
        description: `Great job delivering from ${activeTask.storeName}`
      });
      
      setActiveTask(null);
    }
  };
  
  if (!activeTask) return null;
  
  return (
    <Card className="border-purple-300 dark:border-purple-800 fixed bottom-20 left-4 right-4 z-20 shadow-lg">
      <CardContent className="p-3">
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
        
        <div className="flex items-center justify-between">
          <div className="text-xs">
            <span className="font-medium">Status:</span> {progress < 100 ? "In progress" : "Ready to complete"}
          </div>
          
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
