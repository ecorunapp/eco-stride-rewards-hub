import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bike, Car, Package, Footprints, Zap } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  storeName: string;
  description: string;
  distance: number;
  coins: number;
  estimatedTime: string;
}

export interface ActiveTask extends Task {
  transportMode: TransportOption;
  startTime: number; // timestamp when task started
  status: "in-progress" | "completed" | "canceled";
}

interface TaskDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

type TransportOption = "walk" | "run" | "bike" | "scooter" | "car";

const TaskDetailDialog: React.FC<TaskDetailDialogProps> = ({
  isOpen,
  onClose,
  task
}) => {
  const [transportMode, setTransportMode] = useState<TransportOption | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  
  const handleStartTask = () => {
    if (!transportMode) {
      toast.error("Please select a transportation mode");
      return;
    }
    
    setIsStarting(true);
    
    // Create active task object
    const activeTask: ActiveTask = {
      ...task,
      transportMode,
      startTime: Date.now(),
      status: "in-progress"
    };
    
    // Save to local storage
    localStorage.setItem("ecoDropActiveTask", JSON.stringify(activeTask));
    
    // Simulate starting the task
    setTimeout(() => {
      toast.success(`Task started! You selected ${transportMode} for delivery`, {
        description: `Delivering from ${task.storeName}`
      });
      setIsStarting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{task.storeName}</DialogTitle>
          <DialogDescription className="text-center">
            Task Details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {task.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Distance</p>
                <p className="font-medium">{task.distance} km</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Est. Time</p>
                <p className="font-medium">{task.estimatedTime}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Reward</p>
                <p className="font-medium text-coin">{task.coins} ecoCoins</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Select Transportation</h3>
            
            <RadioGroup 
              value={transportMode || undefined} 
              onValueChange={(value) => setTransportMode(value as TransportOption)}
              className="grid grid-cols-3 gap-3"
            >
              <div className="flex flex-col items-center space-y-2">
                <label 
                  htmlFor="walk-option"
                  className="flex flex-col items-center justify-center w-full h-[70px] rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-50 dark:data-[state=checked]:bg-purple-900/20"
                  data-state={transportMode === "walk" ? "checked" : "unchecked"}
                >
                  <Footprints className="h-5 w-5 mb-1" />
                  <span className="text-xs">Walk</span>
                  <RadioGroupItem value="walk" id="walk-option" className="sr-only" />
                </label>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <label 
                  htmlFor="run-option"
                  className="flex flex-col items-center justify-center w-full h-[70px] rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-50 dark:data-[state=checked]:bg-purple-900/20"
                  data-state={transportMode === "run" ? "checked" : "unchecked"}
                >
                  <Zap className="h-5 w-5 mb-1" />
                  <span className="text-xs">Run</span>
                  <RadioGroupItem value="run" id="run-option" className="sr-only" />
                </label>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <label 
                  htmlFor="scooter-option"
                  className="flex flex-col items-center justify-center w-full h-[70px] rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-50 dark:data-[state=checked]:bg-purple-900/20"
                  data-state={transportMode === "scooter" ? "checked" : "unchecked"}
                >
                  <Bike className="h-5 w-5 mb-1" />
                  <span className="text-xs">Scooter</span>
                  <RadioGroupItem value="scooter" id="scooter-option" className="sr-only" />
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleStartTask} 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={!transportMode || isStarting}
          >
            {isStarting ? "Starting..." : "Start Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;
