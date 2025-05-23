
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Award, Bike, User } from "lucide-react";
import { SessionType } from "@/data/mockMeetData";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";

interface ScheduledSessionProps {
  session: SessionType;
}

const ScheduledSession: React.FC<ScheduledSessionProps> = ({ session }) => {
  const isUpcoming = new Date(session.dateTime) > new Date();
  const formattedDate = format(new Date(session.dateTime), "EEEE, MMMM d");
  const formattedTime = format(new Date(session.dateTime), "h:mm a");
  
  const handleCheckIn = () => {
    // In a real app, this would update the session status and potentially start tracking
    toast.success("Successfully checked in!");
  };
  
  const handleCancel = () => {
    // In a real app, this would cancel the session
    toast.success("Session cancelled");
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={session.partner.avatarUrl} alt={session.partner.name} />
            <AvatarFallback>{session.partner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{session.partner.name}</h3>
              {session.activityType && (
                <Badge className={session.activityType === "walk" ? "bg-blue-500" : "bg-eco"}>
                  {session.activityType.charAt(0).toUpperCase() + session.activityType.slice(1)}
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 text-xs mt-2">
              <div className="flex items-center text-muted-foreground">
                <Calendar size={12} className="mr-1" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock size={12} className="mr-1" />
                <span>{formattedTime}</span>
              </div>
              <div className="flex items-center text-muted-foreground mt-1 col-span-2">
                <MapPin size={12} className="mr-1" />
                <span>{session.meetingLocation}</span>
              </div>
            </div>
            
            {session.sparkProgress && (
              <div className="mt-2 text-xs flex items-center">
                {session.sparkProgress === "next-stage" ? (
                  <div className="flex items-center text-yellow-600">
                    <Award size={12} className="mr-1" />
                    <span>This activity will unlock the next Spark stage!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-muted-foreground">
                    <User size={12} className="mr-1" />
                    <span>Building connection: {session.sparkProgress}</span>
                  </div>
                )}
              </div>
            )}
            
            {session.activityData && (
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Steps:</span>
                  <p className="font-medium">{session.activityData.steps.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Distance:</span>
                  <p className="font-medium">{session.activityData.distance} km</p>
                </div>
                <div>
                  <span className="text-muted-foreground">EcoCoins:</span>
                  <p className="font-medium">{session.activityData.coins}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          {isUpcoming && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-eco hover:bg-eco-dark"
                onClick={handleCheckIn}
              >
                Check In
              </Button>
            </>
          )}
          {!isUpcoming && session.status === "completed" && (
            <Button 
              size="sm"
              variant="outline"
            >
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledSession;
