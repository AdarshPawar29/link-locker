"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ExternalLink, MoreVertical, Calendar, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  description: string;
  previewImage: string;
  tags: string[];
  createdAt: string;
  clickCount: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LinkCard({
  id,
  title,
  url,
  description,
  previewImage,
  tags,
  createdAt,
  clickCount,
  onEdit,
  onDelete,
}: LinkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Add toast notification here
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="aspect-video w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `url(${previewImage || "/placeholder-image.jpg"})`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex justify-between items-start">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyUrl}>
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
          
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Calendar className="h-3 w-3" />
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-white/20 text-xs text-white"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isHovered && (
        <div className="p-4">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
        </div>
      )}
    </Card>
  );
}