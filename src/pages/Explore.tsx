
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Route } from "lucide-react";
import PartnerStore from "@/components/explore/PartnerStore";
import { mockPartnerStores } from "@/data/mockData";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStores = mockPartnerStores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-muted-foreground">Discover nearby eco-friendly places</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Search partners..." 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="stores">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="stores">Partner Stores</TabsTrigger>
          <TabsTrigger value="routes">Eco Routes</TabsTrigger>
        </TabsList>
        <TabsContent value="stores" className="pt-4">
          {filteredStores.length > 0 ? (
            <div className="grid gap-4">
              {filteredStores.map(store => (
                <PartnerStore 
                  key={store.id}
                  name={store.name}
                  category={store.category}
                  distance={store.distance}
                  imageUrl={store.imageUrl}
                  address={store.address}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No stores found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or location
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="routes" className="pt-4">
          <div className="text-center py-10">
            <Route className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">Routes Coming Soon</h3>
            <p className="text-muted-foreground mt-2">
              We're working on adding eco-friendly routes in your area
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
