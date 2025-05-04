
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Award, Heart, HeartHandshake, Handshake } from "lucide-react";
import { mockSparkConnections } from "@/data/mockMeetData";

const SparkStage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Spark Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Connect with others through 3 stages of shared activities
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <div className="bg-background p-2 rounded-full">
                  <Handshake className="h-6 w-6 text-eco" />
                </div>
                <h3 className="font-semibold text-sm mt-2">Friend</h3>
                <p className="text-xs text-center text-muted-foreground mt-1">1st activity together</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <div className="bg-background p-2 rounded-full">
                  <HeartHandshake className="h-6 w-6 text-eco" />
                </div>
                <h3 className="font-semibold text-sm mt-2">Bond</h3>
                <p className="text-xs text-center text-muted-foreground mt-1">3rd activity together</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <div className="bg-background p-2 rounded-full">
                  <Heart className="h-6 w-6 text-eco" />
                </div>
                <h3 className="font-semibold text-sm mt-2">Connect</h3>
                <p className="text-xs text-center text-muted-foreground mt-1">5th activity unlocks special features</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Your Connections</h2>
        {mockSparkConnections.map((connection) => (
          <Card key={connection.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={connection.avatarUrl} alt={connection.name} />
                  <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{connection.name}</h3>
                    <Badge className={
                      connection.stage === "friend" ? "bg-blue-500" :
                      connection.stage === "bond" ? "bg-purple-500" : "bg-pink-500"
                    }>
                      {connection.stage.charAt(0).toUpperCase() + connection.stage.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Activities: {connection.activitiesCompleted}/5</span>
                      {connection.activitiesCompleted >= 3 && (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-500">Spark Gift Unlocked!</span>
                        </div>
                      )}
                    </div>
                    <Progress value={(connection.activitiesCompleted / 5) * 100} className="h-2" />
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    {connection.lastActivity}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {mockSparkConnections.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <HeartHandshake className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No connections yet</h3>
              <p className="text-muted-foreground mt-2">
                Start scheduling activities to build connections!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SparkStage;
