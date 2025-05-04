
import React, { useState } from "react";
import { Accessibility, Navigation, Store, Bike, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface MobilityOption {
  id: string;
  name: string;
  type: "scooter" | "wheelchair" | "bike";
  distance: string;
  availability: "available" | "in-use" | "charging";
  batteryLevel?: number;
}

interface PartnerStore {
  id: string;
  name: string;
  category: string;
  distance: number;
  address: string;
  imageUrl: string;
}

const mobilityOptions: MobilityOption[] = [
  {
    id: "ev-scooter-1",
    name: "EV Scooter",
    type: "scooter",
    distance: "0.3 km away",
    availability: "available",
    batteryLevel: 87,
  },
  {
    id: "smart-wheelchair-1",
    name: "Smart Wheelchair",
    type: "wheelchair",
    distance: "0.5 km away",
    availability: "available",
    batteryLevel: 92,
  },
  {
    id: "ev-bike-1",
    name: "EV Bike",
    type: "bike",
    distance: "0.7 km away",
    availability: "charging",
    batteryLevel: 45,
  },
  {
    id: "ev-scooter-2",
    name: "EV Scooter Pro",
    type: "scooter",
    distance: "0.8 km away",
    availability: "available",
    batteryLevel: 76,
  },
  {
    id: "ev-bike-2",
    name: "Mountain EV Bike",
    type: "bike",
    distance: "1.1 km away",
    availability: "in-use",
    batteryLevel: 62,
  },
  {
    id: "smart-wheelchair-2",
    name: "Ultra Wheelchair",
    type: "wheelchair",
    distance: "1.3 km away",
    availability: "available",
    batteryLevel: 85,
  },
];

const partnerStores: PartnerStore[] = [
  {
    id: "store-1",
    name: "EcoGear Sports",
    category: "Sports & Fitness",
    distance: 0.8,
    address: "123 Green Street",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "store-2",
    name: "GreenWheel Rentals",
    category: "Mobility",
    distance: 1.2,
    address: "456 Park Avenue",
    imageUrl: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "store-3",
    name: "EcoTech Hub",
    category: "Technology",
    distance: 1.7,
    address: "789 Innovation Blvd",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const MoveMateFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mobility");
  
  const getIconForType = (type: MobilityOption["type"], availability: MobilityOption["availability"]) => {
    const colorClass = availability === 'available' 
      ? 'text-green-500' 
      : availability === 'charging' 
        ? 'text-amber-500' 
        : 'text-red-500';
    
    const bgColorClass = availability === 'available' 
      ? 'bg-green-100' 
      : availability === 'charging' 
        ? 'bg-amber-100' 
        : 'bg-red-100';
    
    return (
      <div className={`p-2 rounded-full ${bgColorClass}`}>
        {type === "wheelchair" ? (
          <Accessibility className={`h-5 w-5 ${colorClass}`} />
        ) : type === "bike" ? (
          <Bike className={`h-5 w-5 ${colorClass}`} />
        ) : (
          <Bike className={`h-5 w-5 ${colorClass}`} />
        )}
      </div>
    );
  };

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
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] max-h-[85vh] overflow-y-auto">
            <DrawerHeader className="text-left">
              <DrawerTitle className="flex items-center text-xl">
                <Accessibility className="h-6 w-6 mr-2 text-eco" />
                MoveMate+<sup className="text-[8px]">™</sup> — Smart Mobility
              </DrawerTitle>
              <DrawerDescription>
                Empowering Every Step, Ride, and Roll
              </DrawerDescription>
            </DrawerHeader>
            
            <Tabs defaultValue="mobility" className="px-4" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="mobility">Mobility Options</TabsTrigger>
                <TabsTrigger value="stores">Partner Stores</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mobility" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mobilityOptions.map((option) => (
                    <Card key={option.id} className="overflow-hidden">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                          {getIconForType(option.type, option.availability)}
                          <div className="ml-3">
                            <h3 className="text-base font-medium">{option.name}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {option.distance}
                            </div>
                          </div>
                        </div>
                        
                        {option.batteryLevel && (
                          <div className="text-xs font-medium">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${option.batteryLevel > 70 ? 'bg-green-500' : option.batteryLevel > 30 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                style={{ width: `${option.batteryLevel}%` }}
                              />
                            </div>
                            <div className="text-center mt-1">{option.batteryLevel}%</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="px-4 pb-4 pt-0">
                        <Button 
                          className={`w-full ${option.availability === "available" ? "bg-eco hover:bg-eco-dark" : ""}`}
                          variant={option.availability === "available" ? "default" : "outline"}
                          disabled={option.availability !== "available"}
                        >
                          {option.availability === "available" ? "Book Now" : 
                           option.availability === "charging" ? "Charging" : "In Use"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-2 pt-2 pb-4">
                  <h4 className="text-sm font-medium">About MoveMate+</h4>
                  <p className="text-sm text-muted-foreground">
                    MoveMate+ connects you to on-demand, AI-matched mobility tools like
                    smart wheelchairs, electric scooters, EV bikes, or
                    community-supported delivery kits.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="stores" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerStores.map((store) => (
                    <Card key={store.id} className="overflow-hidden">
                      <div className="h-36 relative overflow-hidden">
                        <img
                          src={store.imageUrl}
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge variant="secondary" className="absolute top-2 right-2">
                          {store.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{store.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                          <MapPin size={14} />
                          <span className="flex-1">{store.address}</span>
                          <span className="text-xs font-medium">
                            {store.distance < 1 
                              ? `${Math.round(store.distance * 1000)}m` 
                              : `${store.distance.toFixed(1)}km`}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-2 pt-2 pb-4">
                  <h4 className="text-sm font-medium">Partner Stores</h4>
                  <p className="text-sm text-muted-foreground">
                    These partner stores offer special discounts and services for MoveMate+ users.
                    Visit them to redeem your ecoCoins or get maintenance for your mobility devices.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </DrawerContent>
        </Drawer>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-2">Nearby Mobility Options</h3>
        
        <div className="space-y-3">
          {mobilityOptions.slice(0, 3).map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
            >
              <div className="flex items-center">
                <div className={`p-1 rounded-full ${option.availability === 'available' ? 'bg-green-100' : option.availability === 'charging' ? 'bg-amber-100' : 'bg-red-100'}`}>
                  {option.type === "wheelchair" ? (
                    <Accessibility className={`h-4 w-4 ${option.availability === 'available' ? 'text-green-500' : option.availability === 'charging' ? 'text-amber-500' : 'text-red-500'}`} />
                  ) : option.type === "bike" ? (
                    <Bike className={`h-4 w-4 ${option.availability === 'available' ? 'text-green-500' : option.availability === 'charging' ? 'text-amber-500' : 'text-red-500'}`} />
                  ) : (
                    <Bike className={`h-4 w-4 ${option.availability === 'available' ? 'text-green-500' : option.availability === 'charging' ? 'text-amber-500' : 'text-red-500'}`} />
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

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full mt-4 text-sm">
              View All Mobility Options
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] max-h-[85vh] overflow-y-auto">
            <DrawerHeader className="text-left">
              <DrawerTitle className="flex items-center text-xl">
                <Accessibility className="h-6 w-6 mr-2 text-eco" />
                MoveMate+<sup className="text-[8px]">™</sup> — Smart Mobility
              </DrawerTitle>
              <DrawerDescription>
                Empowering Every Step, Ride, and Roll
              </DrawerDescription>
            </DrawerHeader>
            
            <Tabs defaultValue="mobility" className="px-4">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="mobility">Mobility Options</TabsTrigger>
                <TabsTrigger value="stores">Partner Stores</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mobility" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mobilityOptions.map((option) => (
                    <Card key={option.id} className="overflow-hidden">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                          {getIconForType(option.type, option.availability)}
                          <div className="ml-3">
                            <h3 className="text-base font-medium">{option.name}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {option.distance}
                            </div>
                          </div>
                        </div>
                        
                        {option.batteryLevel && (
                          <div className="text-xs font-medium">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${option.batteryLevel > 70 ? 'bg-green-500' : option.batteryLevel > 30 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                style={{ width: `${option.batteryLevel}%` }}
                              />
                            </div>
                            <div className="text-center mt-1">{option.batteryLevel}%</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="px-4 pb-4 pt-0">
                        <Button 
                          className={`w-full ${option.availability === "available" ? "bg-eco hover:bg-eco-dark" : ""}`}
                          variant={option.availability === "available" ? "default" : "outline"}
                          disabled={option.availability !== "available"}
                        >
                          {option.availability === "available" ? "Book Now" : 
                           option.availability === "charging" ? "Charging" : "In Use"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="stores" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerStores.map((store) => (
                    <Card key={store.id} className="overflow-hidden">
                      <div className="h-36 relative overflow-hidden">
                        <img
                          src={store.imageUrl}
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge variant="secondary" className="absolute top-2 right-2">
                          {store.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{store.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                          <MapPin size={14} />
                          <span className="flex-1">{store.address}</span>
                          <span className="text-xs font-medium">
                            {store.distance < 1 
                              ? `${Math.round(store.distance * 1000)}m` 
                              : `${store.distance.toFixed(1)}km`}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  );
};

export default MoveMateFeature;
