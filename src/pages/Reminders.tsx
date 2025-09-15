import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddReminderDialog } from "@/components/AddReminderDialog";
import { 
  ArrowLeft, 
  Search, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  MoreHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Reminder {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  priority: string;
  category: string;
  completed: boolean;
  created_at: string;
}

const Reminders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      setReminders(data || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast({
        title: "Error",
        description: "Failed to load reminders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleReminderComplete = async (reminderId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .update({ completed: !completed })
        .eq('id', reminderId);
      
      if (error) throw error;
      
      await fetchReminders();
      toast({
        title: "Success",
        description: completed ? "Reminder marked as incomplete" : "Reminder completed",
      });
    } catch (error) {
      console.error('Error updating reminder:', error);
      toast({
        title: "Error",
        description: "Failed to update reminder",
        variant: "destructive",
      });
    }
  };

  const deleteReminder = async (reminderId: string) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', reminderId);
      
      if (error) throw error;
      
      await fetchReminders();
      toast({
        title: "Success",
        description: "Reminder deleted",
      });
    } catch (error) {
      console.error('Error deleting reminder:', error);
      toast({
        title: "Error",
        description: "Failed to delete reminder",
        variant: "destructive",
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const upcomingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);
  const overdue = upcomingReminders.filter(r => new Date(r.due_date) < new Date());

  const filteredUpcoming = upcomingReminders.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompleted = completedReminders.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Reminders & Deadlines</h1>
              <p className="text-muted-foreground">Stay on track with important scholarship dates</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="outline">
                List
              </Button>
              <AddReminderDialog onReminderAdded={fetchReminders} />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search reminders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-500">{upcomingReminders.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-red-500">{overdue.length}</div>
              <div className="text-sm text-muted-foreground">Past Due</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-500">{completedReminders.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Reminders */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            Upcoming ({filteredUpcoming.length})
          </h2>

          {filteredUpcoming.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming reminders</h3>
                <p className="text-gray-600 mb-4">Add your first reminder to get started</p>
                <AddReminderDialog onReminderAdded={fetchReminders} />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredUpcoming.map((reminder) => {
                const isOverdue = new Date(reminder.due_date) < new Date();
                return (
                  <Card key={reminder.id} className={`${getPriorityColor(reminder.priority)} ${isOverdue ? 'ring-2 ring-red-500' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getPriorityIcon(reminder.priority)}
                            <h3 className="font-semibold text-foreground">{reminder.title}</h3>
                            <Badge variant="outline" className="capitalize">
                              {reminder.category}
                            </Badge>
                            {isOverdue && (
                              <Badge className="bg-red-500 text-white">Overdue</Badge>
                            )}
                          </div>
                          {reminder.description && (
                            <p className="text-muted-foreground text-sm mb-2">{reminder.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Due: {new Date(reminder.due_date).toLocaleDateString()}</span>
                            <span>Priority: {reminder.priority}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => toggleReminderComplete(reminder.id, reminder.completed)}
                            variant="outline"
                            size="sm"
                          >
                            Mark Complete
                          </Button>
                          <Button
                            onClick={() => deleteReminder(reminder.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Completed Reminders */}
        {filteredCompleted.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Completed ({filteredCompleted.length})
            </h2>

            <div className="space-y-4">
              {filteredCompleted.map((reminder) => (
                <Card key={reminder.id} className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <h3 className="font-semibold text-foreground line-through">{reminder.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {reminder.category}
                          </Badge>
                        </div>
                        {reminder.description && (
                          <p className="text-muted-foreground text-sm mb-2 line-through">{reminder.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Completed</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => toggleReminderComplete(reminder.id, reminder.completed)}
                          variant="outline"
                          size="sm"
                        >
                          Mark Incomplete
                        </Button>
                        <Button
                          onClick={() => deleteReminder(reminder.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          Archive
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;