
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { TaskType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface CreateTaskFormProps {
  onTaskCreated: () => void;
  onCancel: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskCreated, onCancel }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState<TaskType>('Run');
  const [distanceKm, setDistanceKm] = useState<number | undefined>(undefined);
  const [deadline, setDeadline] = useState('');
  const [paymentAmount, setPaymentAmount] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to create a task');
      return;
    }
    
    if (!pickupLocation || !dropoffLocation || !description || !deadline || !paymentAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.from('tasks').insert({
        owner_id: user.id,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        description,
        task_type: taskType,
        distance_km: distanceKm,
        deadline,
        payment_amount: paymentAmount,
      });
      
      if (error) throw error;
      
      toast.success('Task created successfully');
      onTaskCreated();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pickup-location">Pickup Location*</Label>
          <Input
            id="pickup-location"
            placeholder="123 Main St, City, State"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dropoff-location">Drop-off Location*</Label>
          <Input
            id="dropoff-location"
            placeholder="456 Oak St, City, State"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          placeholder="Detailed instructions for the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="task-type">Task Type*</Label>
          <Select value={taskType} onValueChange={(value) => setTaskType(value as TaskType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select task type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Run">Run</SelectItem>
              <SelectItem value="Walk">Walk</SelectItem>
              <SelectItem value="EV Scooter">EV Scooter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            type="number"
            step="0.1"
            min="0"
            placeholder="Optional"
            value={distanceKm !== undefined ? distanceKm : ''}
            onChange={(e) => setDistanceKm(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline*</Label>
          <Input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="payment-amount">Payment Amount ($)*</Label>
          <Input
            id="payment-amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={paymentAmount !== undefined ? paymentAmount : ''}
            onChange={(e) => setPaymentAmount(e.target.value ? parseFloat(e.target.value) : undefined)}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="bg-eco hover:bg-eco-dark" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Task'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
