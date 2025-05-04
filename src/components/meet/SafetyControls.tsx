
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, BellRing, Flag, Shield, Navigation, User } from "lucide-react";
import { toast } from "sonner";

const SafetyControls: React.FC = () => {
  const [sosEnabled, setSosEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [accidentDetection, setAccidentDetection] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState(true);
  
  const handleSOSAlert = () => {
    toast.error("SOS Alert Activated! Contacting emergency services and trusted contacts.", {
      duration: 5000,
      icon: <Bell className="text-red-500" />,
    });
  };
  
  const handleSafetyReporting = () => {
    toast.info("Safety report submitted. Our team will review it promptly.", {
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      <Card className="border-red-200">
        <CardHeader className="pb-2 border-b border-red-200">
          <CardTitle className="text-md flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Emergency Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Button 
            variant="destructive" 
            className="w-full text-lg font-bold py-6"
            onClick={handleSOSAlert}
          >
            <BellRing className="h-6 w-6 mr-2" />
            SOS ALERT
          </Button>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button variant="outline" className="border-red-200" onClick={handleSafetyReporting}>
              <Flag className="h-5 w-5 mr-2" />
              Report Issue
            </Button>
            <Button variant="outline" className="border-red-200">
              <Navigation className="h-5 w-5 mr-2" />
              Share Location
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Safety Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">SOS Quick Access</h3>
              <p className="text-xs text-muted-foreground">Enable one-tap SOS alert during activities</p>
            </div>
            <Switch checked={sosEnabled} onCheckedChange={setSosEnabled} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Real-time Location Sharing</h3>
              <p className="text-xs text-muted-foreground">Share your location with trusted contacts during activities</p>
            </div>
            <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Accident Detection</h3>
              <p className="text-xs text-muted-foreground">Automatically detect potential accidents and send alerts</p>
            </div>
            <Switch checked={accidentDetection} onCheckedChange={setAccidentDetection} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Emergency Contacts</h3>
              <p className="text-xs text-muted-foreground">Manage contacts who will be alerted in emergencies</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="pt-2 border-t">
            <Button variant="outline" className="w-full" size="sm">
              <User className="h-4 w-4 mr-2" />
              Verify Your Identity
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Privacy Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Profile Visibility</h3>
              <p className="text-xs text-muted-foreground">Who can see your profile and match with you</p>
            </div>
            <Button variant="outline" size="sm">Settings</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Blocked Users</h3>
              <p className="text-xs text-muted-foreground">Manage users you've blocked from contacting you</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyControls;
