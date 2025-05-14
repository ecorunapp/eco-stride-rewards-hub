
import React, { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import TaskStatusChip from './TaskStatusChip';
import { Loader2, MapPin, Calendar, DollarSign, AlertCircle, CheckCircle2, Truck } from 'lucide-react';

interface TaskUpdateDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated: () => void;
}

const TaskUpdateDialog: React.FC<TaskUpdateDialogProps> = ({ task, isOpen, onClose, onTaskUpdated }) => {
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const handleUpdateStatus = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', task.id);
        
      if (error) throw error;
      
      toast({
        title: "Status Updated",
        description: `Task status updated to ${status}`,
        variant: "default",
      });
      onTaskUpdated();
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || 'Failed to update task status',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setIsPaying(true);
    
    try {
      // First, create a payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          task_id: task.id,
          amount: task.payment_amount,
        });
        
      if (paymentError) throw paymentError;
      
      // Then, update task status to Paid
      const { error: taskError } = await supabase
        .from('tasks')
        .update({ 
          status: 'Paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', task.id);
        
      if (taskError) throw taskError;
      
      toast({
        title: "Payment Completed",
        description: "Payment processed successfully",
        variant: "default",
      });
      onTaskUpdated();
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || 'Failed to process payment',
        variant: "destructive",
      });
    } finally {
      setIsPaying(false);
    }
  };

  const getStatusOptions = () => {
    switch(task.status) {
      case 'Pending':
        return ['Pending', 'Accepted'];
      case 'Accepted':
        return ['Accepted', 'In Progress'];
      case 'In Progress':
        return ['In Progress', 'Completed'];
      case 'Completed':
        return ['Completed'];
      case 'Paid':
        return ['Paid'];
      default:
        return ['Pending'];
    }
  };
  
  const canUpdateStatus = task.status !== 'Paid' && status !== task.status;
  const canPay = task.status === 'Completed';
  
  const getStatusPrompt = () => {
    switch(status) {
      case 'Pending':
        return "This delivery is waiting for a runner to accept it.";
      case 'Accepted':
        return "A runner has accepted this task and will pick up the package soon.";
      case 'In Progress':
        return "The package is being transported to its destination.";
      case 'Completed':
        return "The delivery has been completed successfully.";
      case 'Paid':
        return "Payment for this delivery has been processed.";
      default:
        return "";
    }
  };
  
  const getStatusIcon = () => {
    switch(status) {
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'Accepted':
        return <CheckCircle2 className="h-4 w-4 text-purple-500" />;
      case 'In Progress':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'Paid':
        return <DollarSign className="h-4 w-4 text-eco" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            Manage your delivery task and update its status
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span> 
            <TaskStatusChip status={task.status} />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Pickup:</p>
                <p className="text-sm text-muted-foreground">{task.pickup_location}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Drop-off:</p>
                <p className="text-sm text-muted-foreground">{task.dropoff_location}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-semibold">Description:</p>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold">Deadline:</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(task.deadline), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold">Payment:</p>
              </div>
              <p className="text-sm text-muted-foreground">
                ${task.payment_amount.toFixed(2)}
              </p>
            </div>
          </div>
          
          {task.status !== 'Paid' && (
            <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Label htmlFor="status">Update Delivery Status</Label>
              <Select 
                value={status} 
                onValueChange={(value) => setStatus(value as TaskStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {getStatusOptions().map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                {getStatusIcon()}
                <p className="text-sm text-muted-foreground">{getStatusPrompt()}</p>
              </div>
            </div>
          )}
          
          {canPay && (
            <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Task is completed. You can now make the payment to finalize it.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex space-x-2 sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          <div className="flex space-x-2">
            {canUpdateStatus && (
              <Button 
                onClick={handleUpdateStatus}
                disabled={isLoading}
                className="bg-eco hover:bg-eco-dark"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Status
              </Button>
            )}
            
            {canPay && (
              <Button 
                onClick={handlePayment}
                disabled={isPaying}
                className="bg-coin hover:bg-coin-dark"
              >
                {isPaying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Process Payment
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskUpdateDialog;
