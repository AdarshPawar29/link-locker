"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, MoreVertical, Link as LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LockerCardProps {
  title: string;
  description: string;
  linkCount: number;
  isPublic: boolean;
  imageUrl: string;
}

export function LockerCard({
  title,
  description,
  linkCount,
  isPublic,
  imageUrl,
}: LockerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out"
      style={{
        aspectRatio: "16 / 9",
        width: "100%", // Changed from fixed width to 100%
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 ease-in-out" />

      <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <div className="flex items-center space-x-2">
            {isPublic ? (
              <Unlock className="h-4 w-4 text-white" />
            ) : (
              <Lock className="h-4 w-4 text-white" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-white line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-white">
              <LinkIcon className="mr-1 h-4 w-4" />
              {linkCount} links
            </div>
            <Link href={`/dashboard/locker/development-resources`}>
              <Button
                size="sm"
                className="bg-white text-black hover:bg-white/90"
              >
                Open
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {!isHovered && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
      )}
    </Card>
  );
}
