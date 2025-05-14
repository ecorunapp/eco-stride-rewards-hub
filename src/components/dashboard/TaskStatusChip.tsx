
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TaskStatus } from '@/types';

interface TaskStatusChipProps {
  status: TaskStatus;
}

const TaskStatusChip: React.FC<TaskStatusChipProps> = ({ status }) => {
  const getStatusVariant = () => {
    switch (status) {
      case 'Pending':
        return 'outline';
      case 'Accepted':
        return 'secondary';
      case 'In Progress':
        return 'default';
      case 'Completed':
        return 'default';
      case 'Paid':
        return 'secondary'; // Changed from 'success' to 'secondary' as 'success' is not a valid variant
      default:
        return 'outline';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Pending':
        return 'text-gray-600';
      case 'Accepted':
        return 'text-purple-600';
      case 'In Progress':
        return 'text-blue-600';
      case 'Completed':
        return 'text-green-600';
      case 'Paid':
        return 'text-eco';
      default:
        return '';
    }
  };

  return (
    <Badge variant={getStatusVariant()} className={getStatusColor()}>
      {status}
    </Badge>
  );
};

export default TaskStatusChip;
