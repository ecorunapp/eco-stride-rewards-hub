
import React from "react";
import { Accessibility, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MobilityOption {
  id: string;
  name: string;
  type: string;
  distance: string;
  availability: "available" | "in-use" | "charging";
}

const mobilityOptions: MobilityOption[] = [
  {
    id: "ev-scooter-1",
    name: "EV Scooter",
    type: "scooter",
    distance: "0.3 km away",
    availability: "available",
  },
  {
    id: "smart-wheelchair-1",
    name: "Smart Wheelchair",
    type: "wheelchair",
    distance: "0.5 km away",
    availability: "available",
  },
  {
    id: "ev-bike-1",
    name: "EV Bike",
    type: "bike",
    distance: "0.7 km away",
    availability: "charging",
  },
];

const MoveMateFeature: React.FC = () => {
  return (
    <Card className="border-eco/20 overflow-hidden">
      <CardHeader className="bg-eco/10 p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="bg-eco rounded-full p-2 mr-3">
            <Accessibility className="text-white h-5 w-5" />
          </div>
          <CardTitle className="text-base">
            MoveMate+<sup className="text-[8px]">™</sup>
          </CardTitle>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              Learn More
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Accessibility className="h-5 w-5 mr-2 text-eco" />
                MoveMate+<sup className="text-[8px]">™</sup> — Smart Mobility
              </DialogTitle>
              <DialogDescription className="pt-2">
                Empowering Every Step, Ride, and Roll
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm">
                MoveMate+ connects you to on-demand, AI-matched mobility tools like
                smart wheelchairs, electric scooters, EV bikes, or
                community-supported delivery kits.
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Smart vehicle matching using AI</li>
                  <li>On-demand access to mobility devices</li>
                  <li>Inclusive earning for all mobility levels</li>
                  <li>Subscription or per-task usage options</li>
                  <li>Extra EcoCoins for using eco-friendly transportation</li>
                  <li>Built-in safety features with SOS button</li>
                </ul>
              </div>
              
              <p className="text-sm italic border-l-2 border-eco/30 pl-2">
                "Because Every Step Forward Should Be for Everyone."
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-2">Nearby Mobility Options</h3>
        
        <div className="space-y-3">
          {mobilityOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
            >
              <div className="flex items-center">
                <div className={`p-1 rounded-full ${option.availability === 'available' ? 'bg-green-100' : option.availability === 'charging' ? 'bg-amber-100' : 'bg-red-100'}`}>
                  {option.type === "wheelchair" ? (
                    <Accessibility className={`h-4 w-4 ${option.availability === 'available' ? 'text-green-500' : option.availability === 'charging' ? 'text-amber-500' : 'text-red-500'}`} />
                  ) : (
                    <Navigation className={`h-4 w-4 ${option.availability === 'available' ? 'text-green-500' : option.availability === 'charging' ? 'text-amber-500' : 'text-red-500'}`} />
                  )}
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">{option.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {option.distance}
                  </div>
                </div>
              </div>
              
              <Button 
                size="sm" 
                variant={option.availability === "available" ? "default" : "outline"} 
                className={option.availability === "available" ? "bg-eco hover:bg-eco-dark text-xs h-8 px-3" : "text-xs h-8 px-3"}
                disabled={option.availability !== "available"}
              >
                {option.availability === "available" ? "Book Now" : 
                 option.availability === "charging" ? "Charging" : "In Use"}
              </Button>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 text-sm">
          View All Mobility Options
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoveMateFeature;
