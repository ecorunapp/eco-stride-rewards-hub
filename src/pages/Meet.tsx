
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Clock, User, Bell, Users, Bike, Award, Shield, Heart, HeartHandshake, Handshake } from "lucide-react";
import RunnerMatch from "@/components/meet/RunnerMatch";
import ScheduledSession from "@/components/meet/ScheduledSession";
import SparkStage from "@/components/meet/SparkStage";
import SafetyControls from "@/components/meet/SafetyControls";
import { mockRunnerMatches, mockScheduledSessions, mockCompletedSessions } from "@/data/mockMeetData";
import { Badge } from "@/components/ui/badge";

const Meet = () => {
  const [activeTab, setActiveTab] = useState<"matches" | "scheduled" | "history" | "spark" | "safety">("matches");
  const [locationRadius, setLocationRadius] = useState<number>(5); // in km
  const [activityType, setActivityType] = useState<"all" | "walk" | "run">("all");
  const [pendingConnections, setPendingConnections] = useState<{
    name: string;
    avatarUrl: string;
    requestType: string;
    stage: "pending" | "friend" | "bond" | "connect";
  }[]>([
    {
      name: "Emma Wilson",
      avatarUrl: "/placeholder.svg",
      requestType: "Run Together",
      stage: "pending"
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meet & Run</h1>
        <p className="text-muted-foreground">
          Connect with runners nearby and schedule sessions together
        </p>
      </div>
      
      {pendingConnections.length > 0 && (
        <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200">
          <CardContent className="p-4">
            <div className="font-medium mb-2">Connection Requests</div>
            {pendingConnections.map((request, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.avatarUrl} alt={request.name} />
                    <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{request.name}</div>
                    <div className="text-xs text-muted-foreground">{request.requestType}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    Decline
                  </Button>
                  <Button size="sm" className="h-8 bg-indigo-500 hover:bg-indigo-600">
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        <Card className="p-3 text-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2 w-10 h-10 mx-auto mb-1 flex items-center justify-center">
            <Handshake className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-xs font-medium">Friend</div>
          <div className="text-[10px] text-muted-foreground">1st activity</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-2 w-10 h-10 mx-auto mb-1 flex items-center justify-center">
            <HeartHandshake className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-xs font-medium">Bond</div>
          <div className="text-[10px] text-muted-foreground">3rd activity</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="rounded-full bg-pink-100 dark:bg-pink-900/20 p-2 w-10 h-10 mx-auto mb-1 flex items-center justify-center">
            <Heart className="h-5 w-5 text-pink-500" />
          </div>
          <div className="text-xs font-medium">Connect</div>
          <div className="text-[10px] text-muted-foreground">5th activity</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/20 p-2 w-10 h-10 mx-auto mb-1 flex items-center justify-center">
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-xs font-medium">Rewards</div>
          <div className="text-[10px] text-muted-foreground">All stages</div>
        </Card>
      </div>
      
      <Tabs defaultValue="matches" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full sm:grid-cols-5 grid-cols-3">
          <TabsTrigger value="matches">Find Runners</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="spark">Spark Stages</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches" className="pt-4">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Match Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Distance Radius</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={locationRadius}
                      onChange={(e) => setLocationRadius(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium">{locationRadius} km</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Type</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={activityType === "all" ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setActivityType("all")}
                      className={activityType === "all" ? "bg-eco hover:bg-eco-dark" : ""}
                    >
                      All
                    </Button>
                    <Button 
                      variant={activityType === "walk" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActivityType("walk")}
                      className={activityType === "walk" ? "bg-eco hover:bg-eco-dark" : ""}
                    >
                      <Bike size={16} className="mr-1" /> Walk
                    </Button>
                    <Button 
                      variant={activityType === "run" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActivityType("run")}
                      className={activityType === "run" ? "bg-eco hover:bg-eco-dark" : ""}
                    >
                      <Users size={16} className="mr-1" /> Run
                    </Button>
                  </div>
                </div>
                
                <Button className="bg-eco hover:bg-eco-dark">Update Preferences</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Potential Matches</h2>
            {mockRunnerMatches.map((match) => (
              <RunnerMatch key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="pt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
            {mockScheduledSessions.length > 0 ? (
              mockScheduledSessions.map((session) => (
                <ScheduledSession key={session.id} session={session} />
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">No scheduled sessions</h3>
                  <p className="text-muted-foreground mt-2">
                    Match with runners and schedule your first session!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          {mockCompletedSessions.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Completed Sessions</h2>
              {mockCompletedSessions.map((session) => (
                <ScheduledSession key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No session history yet</h3>
              <p className="text-muted-foreground mt-2">
                Your completed sessions will appear here
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="spark" className="pt-4">
          <SparkStage />
        </TabsContent>
        
        <TabsContent value="safety" className="pt-4">
          <SafetyControls />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Meet;
