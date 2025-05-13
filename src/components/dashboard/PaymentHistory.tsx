
import React, { useEffect, useState } from 'react';
import { Payment, Task } from '@/types';
import { supabase } from '@/lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentHistoryProps {
  userId: string;
}

interface PaymentWithTask extends Payment {
  task: Task;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ userId }) => {
  const [payments, setPayments] = useState<PaymentWithTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        // First get all tasks owned by the user
        const { data: tasks, error: tasksError } = await supabase
          .from('tasks')
          .select('id')
          .eq('owner_id', userId)
          .eq('status', 'Paid');
          
        if (tasksError) throw tasksError;
        
        if (!tasks || tasks.length === 0) {
          setPayments([]);
          return;
        }
        
        // Get all payments related to these tasks
        const taskIds = tasks.map(task => task.id);
        
        const { data: paymentData, error: paymentsError } = await supabase
          .from('payments')
          .select(`
            *,
            task:tasks(*)
          `)
          .in('task_id', taskIds)
          .order('created_at', { ascending: false });
          
        if (paymentsError) throw paymentsError;
        
        setPayments(paymentData || []);
      } catch (error: any) {
        toast.error(error.message || 'Failed to load payment history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-eco" />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground mb-4">No payment history yet.</p>
          <p className="text-sm text-center text-muted-foreground mb-4">
            When tasks are completed and paid, they will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          Total amount paid: ${totalPaid.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Dropoff</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{format(new Date(payment.created_at), 'MMM d, yyyy')}</TableCell>
                <TableCell>{payment.task.task_type}</TableCell>
                <TableCell className="max-w-[150px] truncate" title={payment.task.pickup_location}>
                  {payment.task.pickup_location}
                </TableCell>
                <TableCell className="max-w-[150px] truncate" title={payment.task.dropoff_location}>
                  {payment.task.dropoff_location}
                </TableCell>
                <TableCell className="text-right font-medium">${Number(payment.amount).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
