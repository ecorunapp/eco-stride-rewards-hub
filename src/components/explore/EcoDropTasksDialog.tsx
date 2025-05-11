
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Package } from "lucide-react";
import TaskDetailDialog from "./TaskDetailDialog";

interface Task {
  id: string;
  storeName: string;
  description: string;
  distance: number; // in km
  coins: number;
  estimatedTime: string;
}

// Mock data for nearby tasks
const nearbyTasks: Task[] = [
  {
    id: "task1",
    storeName: "Eco Market",
    description: "Deliver grocery package to customer within 2km radius",
    distance: 1.2,
    coins: 50,
    estimatedTime: "15-20 min"
  },
  {
    id: "task2",
    storeName: "Green Pharmacy",
    description: "Pickup and deliver medication to elderly customer",
    distance: 0.8,
    coins: 35,
    estimatedTime: "10-15 min"
  },
  {
    id: "task3",
    storeName: "Fresh Foods",
    description: "Urgent food delivery to business customer",
    distance: 1.5,
    coins: 60,
    estimatedTime: "20-25 min"
  },
  {
    id: "task4",
    storeName: "EcoBooks",
    description: "Deliver educational materials to school",
    distance: 2.1,
    coins: 75,
    estimatedTime: "25-30 min"
  }
];

interface EcoDropTasksDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EcoDropTasksDialog: React.FC<EcoDropTasksDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleCloseTaskDetail = () => {
    setIsTaskDetailOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Nearby Delivery Tasks</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {nearbyTasks.map((task) => (
              <div 
                key={task.id} 
                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-base">{task.storeName}</h3>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
                    {task.estimatedTime}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                  {task.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <MapPin size={14} />
                    <span>{task.distance} km away</span>
                  </div>
                  <div className="font-medium text-coin">
                    +{task.coins} ecoCoins
                  </div>
                </div>
              </div>
            ))}
            
            {nearbyTasks.length === 0 && (
              <div className="text-center p-6">
                <Package className="mx-auto h-12 w-12 text-slate-400 mb-2" />
                <h3 className="font-medium text-lg">No tasks available</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  There are no delivery tasks in your area at the moment
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedTask && (
        <TaskDetailDialog
          isOpen={isTaskDetailOpen}
          onClose={handleCloseTaskDetail}
          task={selectedTask}
        />
      )}
    </>
  );
};

export default EcoDropTasksDialog;
