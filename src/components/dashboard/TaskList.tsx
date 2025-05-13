
import React, { useState } from 'react';
import { Task } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import TaskStatusChip from './TaskStatusChip';
import TaskUpdateDialog from './TaskUpdateDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onTaskUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, onTaskUpdated }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsUpdateDialogOpen(true);
  };

  const handleTaskUpdated = () => {
    setIsUpdateDialogOpen(false);
    onTaskUpdated();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-eco" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground mb-4">You don't have any tasks yet.</p>
          <p className="text-sm text-center text-muted-foreground mb-4">
            Create a new task to get started with your eco-friendly delivery services.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Dropoff</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Badge variant={
                  task.task_type === 'Run' ? 'default' :
                  task.task_type === 'Walk' ? 'outline' : 'secondary'
                }>
                  {task.task_type}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[150px] truncate" title={task.pickup_location}>
                {task.pickup_location}
              </TableCell>
              <TableCell className="max-w-[150px] truncate" title={task.dropoff_location}>
                {task.dropoff_location}
              </TableCell>
              <TableCell>
                {format(new Date(task.deadline), 'MMM d, h:mm a')}
              </TableCell>
              <TableCell>${task.payment_amount.toFixed(2)}</TableCell>
              <TableCell>
                <TaskStatusChip status={task.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewTask(task)}
                >
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedTask && (
        <TaskUpdateDialog
          task={selectedTask}
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default TaskList;
