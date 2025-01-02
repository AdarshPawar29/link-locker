"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, MoreVertical, Link as LinkIcon, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LockerCardProps {
  id: string;
  title: string;
  description: string;
  linkCount: number;
  isPublic: boolean;
  imageUrl: string;
}

export function LockerCard({
  id,
  title,
  description,
  linkCount,
  isPublic,
  imageUrl,
}: LockerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card
      className="relative overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl"
      style={{
        aspectRatio: "16 / 9",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            {isPublic ? (
              <Unlock className="h-4 w-4 text-white" />
            ) : (
              <Lock className="h-4 w-4 text-white" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
            >
              <Star
                className={`h-4 w-4 ${
                  isFavorite ? "fill-yellow-400 text-yellow-400" : ""
                }`}
              />
            </Button>
          </div>
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

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-white/80">
              <LinkIcon className="mr-1 h-4 w-4" />
              {linkCount} links
            </div>
            <Link href={`/dashboard/locker/${id}`}>
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
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
      )}
    </Card>
  );
}