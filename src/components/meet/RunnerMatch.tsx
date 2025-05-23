
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, User, Award } from "lucide-react";
import { RunnerMatchType } from "@/data/mockMeetData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface RunnerMatchProps {
  match: RunnerMatchType;
}

const RunnerMatch: React.FC<RunnerMatchProps> = ({ match }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [meetingLocation, setMeetingLocation] = useState<string>("");
  const [activityType, setActivityType] = useState<"walk" | "run">("walk");

  const handleScheduleSession = () => {
    if (!selectedDate || !selectedTime || !meetingLocation) {
      toast.error("Please fill in all session details");
      return;
    }

    // Here we would normally send this to an API
    toast.success(`${activityType.charAt(0).toUpperCase() + activityType.slice(1)} session scheduled with ${match.name}!`);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={match.avatarUrl} alt={match.name} />
            <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{match.name}</h3>
              {match.sparkStage && (
                <Badge className={
                  match.sparkStage === "friend" ? "bg-blue-500" :
                  match.sparkStage === "bond" ? "bg-purple-500" : "bg-pink-500"
                }>
                  {match.sparkStage.charAt(0).toUpperCase() + match.sparkStage.slice(1)}
                </Badge>
              )}
              {match.badges && match.badges.length > 0 && (
                <div className="flex">
                  <Award size={16} className="text-yellow-500" aria-label={match.badges[0]} />
                </div>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin size={12} className="mr-1" />
              <span>{match.distance} km away • {match.location}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <User size={12} className="mr-1" />
              <span>{match.age} • {match.preferences.runningSpeed} pace</span>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-eco hover:bg-eco-dark">Schedule</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule a Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="activity-type" className="text-sm font-medium">Activity Type</label>
                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant={activityType === "walk" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActivityType("walk")}
                      className={activityType === "walk" ? "bg-eco hover:bg-eco-dark flex-1" : "flex-1"}
                    >
                      Walk Together
                    </Button>
                    <Button 
                      type="button"
                      variant={activityType === "run" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActivityType("run")}
                      className={activityType === "run" ? "bg-eco hover:bg-eco-dark flex-1" : "flex-1"}
                    >
                      Run Together
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium">Time</label>
                  <input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">Meeting Location</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g. Central Park Entrance"
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Button 
                  onClick={handleScheduleSession} 
                  className="w-full bg-eco hover:bg-eco-dark mt-2"
                >
                  Schedule {activityType.charAt(0).toUpperCase() + activityType.slice(1)}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default RunnerMatch;
