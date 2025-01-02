"use client";

import { Card } from "../ui/card";
import { Clock, Link as LinkIcon, Share2, Star } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-primary/10">
          <LinkIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Links</p>
          <h3 className="text-2xl font-bold">247</h3>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Star className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Favorites</p>
          <h3 className="text-2xl font-bold">32</h3>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Share2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Shared</p>
          <h3 className="text-2xl font-bold">15</h3>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Recent</p>
          <h3 className="text-2xl font-bold">8</h3>
        </div>
      </Card>
    </div>
  );
}