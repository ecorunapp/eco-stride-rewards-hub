
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import EcoCoinsBalance from "@/components/common/EcoCoinsBalance";
import { mockUser } from "@/data/mockData";

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>
      
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
          <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-semibold mt-4">{mockUser.name}</h2>
        <p className="text-muted-foreground">{mockUser.location}</p>
        
        <div className="mt-2">
          <EcoCoinsBalance balance={mockUser.ecoCoins} showLabel={true} />
        </div>
        
        <Button variant="outline" className="mt-4">Edit Profile</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={mockUser.name} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" defaultValue={mockUser.age} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue={mockUser.location} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="walkingSpeed">Walking Speed</Label>
            <Select defaultValue={mockUser.preferences.walkingSpeed}>
              <SelectTrigger>
                <SelectValue placeholder="Select walking speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="runningSpeed">Running Speed</Label>
            <Select defaultValue={mockUser.preferences.runningSpeed}>
              <SelectTrigger>
                <SelectValue placeholder="Select running speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dailyGoal">Daily Step Goal</Label>
            <Input 
              id="dailyGoal"
              type="number"
              defaultValue={mockUser.dailyGoal}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredDistance">Preferred Distance (km)</Label>
            <Input 
              id="preferredDistance"
              type="number"
              defaultValue={mockUser.preferences.preferredDistance}
              step={0.5}
            />
          </div>
          
          <Button className="w-full mt-2">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
