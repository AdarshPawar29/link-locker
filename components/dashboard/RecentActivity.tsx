"use client";

import { Card } from "../ui/card";
import { Plus, ExternalLink, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "add" | "visit" | "delete";
  title: string;
  timestamp: Date;
  url?: string;
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "add",
      title: "React Design Patterns",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      url: "https://example.com/react-patterns",
    },
    {
      id: "2",
      type: "visit",
      title: "TypeScript Best Practices",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      url: "https://example.com/typescript",
    },
    {
      id: "3",
      type: "delete",
      title: "Old Resource",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "add":
        return <Plus className="h-4 w-4 text-green-500" />;
      case "visit":
        return <ExternalLink className="h-4 w-4 text-blue-500" />;
      case "delete":
        return <Trash2 className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="max-h-[300px] overflow-y-auto pr-4 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <div className="flex items-center space-x-3">
              {getActivityIcon(activity.type)}
              <div>
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
            {activity.url && (
              <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}