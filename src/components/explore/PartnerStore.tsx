
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface PartnerStoreProps {
  name: string;
  category: string;
  distance: number; // in kilometers
  imageUrl: string;
  address: string;
}

const PartnerStore: React.FC<PartnerStoreProps> = ({
  name,
  category,
  distance,
  imageUrl,
  address,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-36 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge variant="secondary" className="absolute top-2 right-2">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
          <MapPin size={14} />
          <span className="flex-1">{address}</span>
          <span className="text-xs font-medium">
            {distance < 1 
              ? `${Math.round(distance * 1000)}m` 
              : `${distance.toFixed(1)}km`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerStore;
