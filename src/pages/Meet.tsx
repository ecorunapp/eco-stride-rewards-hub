
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Clock, User } from "lucide-react";
import RunnerMatch from "@/components/meet/RunnerMatch";
import ScheduledSession from "@/components/meet/ScheduledSession";
import { mockRunnerMatches, mockScheduledSessions } from "@/data/mockMeetData";

const Meet = () => {
  const [activeTab, setActiveTab] = useState<"matches" | "scheduled" | "history">("matches");
  const [locationRadius, setLocationRadius] = useState<number>(5); // in km

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meet & Run</h1>
        <p className="text-muted-foreground">
          Connect with runners nearby and schedule sessions together
        </p>
      </div>
      
      <Tabs defaultValue="matches" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="matches">Find Runners</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
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
          <div className="text-center py-10">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">No session history yet</h3>
            <p className="text-muted-foreground mt-2">
              Your completed sessions will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Meet;
