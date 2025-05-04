
import React, { useState } from "react";
import { Award, ShoppingBag, Users, Medal, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const RunfluenceFeature = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("creators");

  // Mock data for creators
  const creators = [
    {
      id: 1,
      name: "Emma Johnson",
      handle: "@emmarunner",
      followers: 12500,
      category: "Running",
      avatar: "https://i.pravatar.cc/150?img=1",
      featured: true,
      verified: true,
    },
    {
      id: 2,
      name: "Alex Fitness",
      handle: "@alexfit",
      followers: 8920,
      category: "Strength Training",
      avatar: "https://i.pravatar.cc/150?img=3",
      featured: false,
      verified: true,
    },
    {
      id: 3,
      name: "Sarah Wellness",
      handle: "@sarahwellness",
      followers: 22100,
      category: "Yoga & Mindfulness",
      avatar: "https://i.pravatar.cc/150?img=5",
      featured: true,
      verified: true,
    },
    {
      id: 4,
      name: "Mike Runner",
      handle: "@miketherunner",
      followers: 5300,
      category: "Marathon",
      avatar: "https://i.pravatar.cc/150?img=8",
      featured: false,
      verified: false,
    }
  ];

  // Mock data for challenges
  const challenges = [
    {
      id: 1,
      title: "10K Steps Daily",
      host: "Emma Johnson",
      participants: 3250,
      daysLeft: 5,
      reward: "500 EcoCoins",
      progress: 65,
      category: "Running"
    },
    {
      id: 2,
      title: "30-Day Eco Challenge",
      host: "Sarah Wellness",
      participants: 1890,
      daysLeft: 12,
      reward: "Eco-Friendly Prize Pack",
      progress: 60,
      category: "Lifestyle"
    },
    {
      id: 3,
      title: "Summer Running Series",
      host: "Mike Runner",
      participants: 950,
      daysLeft: 18,
      reward: "Limited Edition Badge",
      progress: 40,
      category: "Running"
    }
  ];

  // Mock data for creator stores
  const stores = [
    {
      id: 1,
      name: "Emma's Eco Gear",
      owner: "Emma Johnson",
      products: 24,
      featured: "Sustainable Running Shoes",
      category: "Fitness Gear"
    },
    {
      id: 2,
      name: "Wellness Essentials",
      owner: "Sarah Wellness",
      products: 35,
      featured: "Bamboo Workout Set",
      category: "Wellness Products"
    },
    {
      id: 3,
      name: "Marathon Must-Haves",
      owner: "Mike Runner",
      products: 16,
      featured: "Hydration Belt",
      category: "Running Gear"
    }
  ];

  const handleOpenChange = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/30 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setDrawerOpen(true)}>
        <CardHeader className="pb-2 pt-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold flex items-center">
              <Award className="h-5 w-5 text-purple-600 mr-2" />
              Runfluence+
              <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700 text-xs dark:bg-purple-900/30 dark:text-purple-300">New</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <p className="text-sm text-muted-foreground pb-2">
            Monetize your fitness journey and inspire others
          </p>
          <div className="grid grid-cols-3 gap-1 mt-2">
            <div className="flex flex-col items-center p-2 bg-white/50 dark:bg-white/5 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-purple-500 mb-1" />
              <span className="text-xs text-center">Creator Store</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white/50 dark:bg-white/5 rounded-lg">
              <Users className="h-5 w-5 text-purple-500 mb-1" />
              <span className="text-xs text-center">Community</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white/50 dark:bg-white/5 rounded-lg">
              <Medal className="h-5 w-5 text-purple-500 mb-1" />
              <span className="text-xs text-center">Challenges</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-3 bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-800/50"
            size="sm"
            onClick={() => setDrawerOpen(true)}
          >
            Explore Runfluence+
          </Button>
        </CardContent>
      </Card>

      <Drawer open={drawerOpen} onOpenChange={handleOpenChange}>
        <DrawerContent className="max-h-[90dvh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center">
              <Award className="h-5 w-5 text-purple-600 mr-2" />
              Runfluence+ Creator Platform
            </DrawerTitle>
            <DrawerDescription>
              Build your fitness brand, connect with followers, and monetize your influence
            </DrawerDescription>
          </DrawerHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="creators">Creators</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="stores">Stores</TabsTrigger>
            </TabsList>
            
            <TabsContent value="creators" className="space-y-4 mt-2">
              <div className="grid grid-cols-1 gap-3">
                {creators.map(creator => (
                  <div 
                    key={creator.id} 
                    className={`p-3 rounded-lg border ${creator.featured ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/50' : 'bg-white dark:bg-gray-800'}`}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 border-2 border-purple-200 dark:border-purple-700">
                        <img src={creator.avatar} alt={creator.name} />
                      </Avatar>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h4 className="font-medium text-sm">{creator.name}</h4>
                          {creator.verified && (
                            <Badge variant="secondary" className="ml-2 h-4 px-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              <span className="text-[10px]">Verified</span>
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground text-xs">{creator.handle}</div>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge variant="outline" className="h-5 text-[10px] bg-transparent">
                            {creator.category}
                          </Badge>
                          <span className="text-xs flex items-center">
                            <Users className="h-3 w-3 mr-1" /> 
                            {creator.followers.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="outline" className="text-xs h-7 px-2 mr-2">
                        View Profile
                      </Button>
                      <Button size="sm" className="text-xs h-7 px-2 bg-purple-600 hover:bg-purple-700">
                        Follow
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Discover More Creators
              </Button>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 dark:bg-purple-900/20 dark:border-purple-800/50">
                <h4 className="font-medium text-sm flex items-center">
                  <Heart className="h-4 w-4 text-purple-600 mr-2" />
                  Become a Runfluence Creator
                </h4>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  Share your fitness journey, build a community, and earn rewards
                </p>
                <Button size="sm" className="w-full text-xs bg-purple-600 hover:bg-purple-700">
                  Apply Now
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="challenges" className="space-y-4 mt-2">
              <div className="grid grid-cols-1 gap-3">
                {challenges.map(challenge => (
                  <div 
                    key={challenge.id} 
                    className="p-3 rounded-lg border bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        <p className="text-muted-foreground text-xs">Hosted by {challenge.host}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {challenge.category}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" /> 
                        {challenge.participants.toLocaleString()} joined
                      </span>
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="font-medium">Reward:</span> {challenge.reward}
                      </div>
                      <Button size="sm" className="text-xs h-7 px-2 bg-purple-600 hover:bg-purple-700">
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                View All Challenges
              </Button>
            </TabsContent>
            
            <TabsContent value="stores" className="space-y-4 mt-2">
              <div className="grid grid-cols-1 gap-3">
                {stores.map(store => (
                  <div 
                    key={store.id} 
                    className="p-3 rounded-lg border bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{store.name}</h4>
                        <p className="text-muted-foreground text-xs">By {store.owner}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {store.category}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs">
                      <div className="flex justify-between">
                        <span>{store.products} products</span>
                      </div>
                      <div className="mt-1">
                        <span className="font-medium">Featured:</span> {store.featured}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" className="text-xs h-7 px-2 bg-purple-600 hover:bg-purple-700">
                        Visit Store
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Explore All Stores
              </Button>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 dark:bg-purple-900/20 dark:border-purple-800/50">
                <h4 className="font-medium text-sm flex items-center">
                  <ShoppingBag className="h-4 w-4 text-purple-600 mr-2" />
                  Create Your Store
                </h4>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  Sell products, earn commission, and grow your fitness brand
                </p>
                <Button size="sm" className="w-full text-xs bg-purple-600 hover:bg-purple-700">
                  Get Started
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <DrawerFooter>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Become a Runfluence Creator
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RunfluenceFeature;
