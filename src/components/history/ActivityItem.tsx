
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "lucide-react";
import EcoCoinsBalance from "../common/EcoCoinsBalance";
import { formatDistanceToNow } from "date-fns";

interface ActivityItemProps {
  type: "walk" | "run";
  steps: number;
  distance: number; // in kilometers
  coins: number;
  duration: number; // in minutes
  date: Date;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  steps,
  distance,
  coins,
  duration,
  date,
}) => {
  const formattedDistance = distance.toFixed(2);
  const formattedDuration = `${Math.floor(duration / 60)}h ${duration % 60}m`;
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-eco-light/30 flex items-center justify-center">
              <Route size={20} className="text-eco-dark" />
            </div>
            <div>
              <h3 className="font-medium capitalize">{type}</h3>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <EcoCoinsBalance balance={coins} size="sm" showLabel={false} />
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Steps</p>
            <p className="font-medium">{steps.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Distance</p>
            <p className="font-medium">{formattedDistance} km</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-medium">{formattedDuration}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityItem;
