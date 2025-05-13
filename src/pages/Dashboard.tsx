
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Task } from '@/types';
import { supabase } from '@/lib/supabase';
import TaskList from '@/components/dashboard/TaskList';
import CreateTaskForm from '@/components/dashboard/CreateTaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, LogOut, Plus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import PaymentHistory from '@/components/dashboard/PaymentHistory';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    if (!user) return;
    
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setTasks(data || []);
      } catch (error: any) {
        toast.error(error.message || 'Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
    
    // Subscribe to real-time updates for tasks
    const channel = supabase
      .channel('public:tasks')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'tasks',
        filter: `owner_id=eq.${user.id}`
      }, (payload) => {
        fetchTasks();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleRefreshTasks = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setTasks(data || []);
      toast.success('Tasks refreshed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to refresh tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setShowCreateForm(false);
    handleRefreshTasks();
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-eco" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.email}</p>
        </div>
        
        <Button variant="outline" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
      
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Tasks</h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshTasks} 
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button 
                size="sm" 
                className="bg-eco hover:bg-eco-dark"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
          
          {showCreateForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Create New Task</CardTitle>
                <CardDescription>Fill in the details for your new eco-friendly task</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateTaskForm 
                  onTaskCreated={handleTaskCreated} 
                  onCancel={() => setShowCreateForm(false)} 
                />
              </CardContent>
            </Card>
          ) : (
            <TaskList 
              tasks={tasks} 
              isLoading={isLoading} 
              onTaskUpdated={handleRefreshTasks} 
            />
          )}
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentHistory userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
