
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ActivityItem from "@/components/history/ActivityItem";
import { mockActivities } from "@/data/mockData";

const History = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity History</h1>
        <p className="text-muted-foreground">Track your progress over time</p>
      </div>
      
      <div className="flex justify-end">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="walk">Walks</SelectItem>
            <SelectItem value="run">Runs</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="activities">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="activities" className="pt-4">
          <div className="space-y-4">
            {mockActivities.map(activity => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                steps={activity.steps}
                distance={activity.distance}
                coins={activity.coins}
                duration={activity.duration}
                date={activity.date}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="stats" className="pt-4">
          <div className="text-center py-10">
            <h3 className="text-lg font-semibold">Statistics Coming Soon</h3>
            <p className="text-muted-foreground mt-2">
              We're working on adding detailed statistics about your activities
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
