
import React from "react";
import { Navigation, Navigation2, MapPin, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TaskNavigationViewProps {
  destination: string;
  distance: number;
  expanded?: boolean;
}

const TaskNavigationView: React.FC<TaskNavigationViewProps> = ({
  destination,
  distance,
  expanded = false
}) => {
  return (
    <Card className={`${expanded ? 'h-full' : 'h-32'} bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden transition-all duration-300`}>
      <CardContent className="p-0 relative h-full flex flex-col">
        {/* Navigation Header */}
        <div className="bg-purple-600 p-2 flex justify-between items-center text-white">
          <div className="flex items-center">
            <Navigation className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Navigation</span>
          </div>
          <div className="text-xs">
            {distance.toFixed(1)} km
          </div>
        </div>
        
        {/* Navigation Content */}
        <div className="flex-1 flex items-center justify-center relative">
          {expanded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Simulated map view */}
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <Navigation2 className="h-16 w-16 text-purple-500 mx-auto animate-pulse" />
                    <div className="mt-2 text-xs font-medium">Navigating to destination...</div>
                  </div>
                  
                  {/* Origin marker */}
                  <div className="absolute bottom-8 left-1/3 flex flex-col items-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full" />
                    <div className="text-[10px] mt-1">You</div>
                  </div>
                  
                  {/* Destination marker */}
                  <div className="absolute top-8 right-1/4 flex flex-col items-center">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <div className="text-[10px] mt-1">{destination}</div>
                  </div>
                  
                  {/* Simulated route */}
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M ${1/3 * 100}%25 ${7/8 * 100}%25 Q ${45}%25 ${50}%25 ${3/4 * 100}%25 ${1/8 * 100}%25' stroke='%239333ea' stroke-width='2' fill='none' stroke-dasharray='5,5' /%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat'
                  }}/>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Navigation2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Navigate to {destination}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Expand view for turn-by-turn directions
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskNavigationView;
