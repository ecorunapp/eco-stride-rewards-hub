
export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  updated_at?: string;
}

export type TaskType = 'Run' | 'Walk' | 'EV Scooter';
export type TaskStatus = 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Paid';

export interface Task {
  id: string;
  owner_id: string;
  runner_id?: string;
  pickup_location: string;
  dropoff_location: string;
  description: string;
  task_type: TaskType;
  distance_km?: number;
  deadline: string;
  payment_amount: number;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  task_id: string;
  amount: number;
  created_at: string;
}
