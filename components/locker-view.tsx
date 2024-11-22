"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreVertical,
  ExternalLink,
  Calendar,
  Tag,
  AlertCircle,
} from "lucide-react";
import { AddLinkDialog } from "./add-link-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Link {
  imageUrl: string;
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  addedAt: string;
}

interface Locker {
  id: string;
  name: string;
  description: string;
  links: Link[];
}

interface LockerViewProps {
  id: string;
}

export function LockerView({ id }: LockerViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);
  const [locker, setLocker] = useState<Locker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLocker() {
      try {
        // Replace this with your actual API call
        // const response = await fetch(`/api/lockers/${id}`);
        // if (!response.ok) throw new Error("Failed to fetch locker");
        // const data = await response.json();

        // Simulating API call with mock data
        const mockData = {
          id,
          name: "Work Resources",
          description: "Important work-related links and resources",
          links: [
            {
              id: "1",
              title: "Company Documentation",
              url: "https://docs.example.com",
              description: "Central documentation hub",
              tags: ["docs", "work"],
              addedAt: "2024-03-20",
              imageUrl: "https://picsum.photos/seed/docs/300/200",
            },
            {
              id: "2",
              title: "Team Calendar",
              url: "https://calendar.example.com",
              description: "Team schedule and important dates",
              tags: ["calendar", "team"],
              addedAt: "2024-03-19",
              imageUrl: "https://picsum.photos/seed/calendar/300/200",
            },
            {
              id: "3",
              title: "Project Management",
              url: "https://pm.example.com",
              description: "Track and manage projects",
              tags: ["project", "management"],
              addedAt: "2024-03-18",
              imageUrl: "https://picsum.photos/seed/project/300/200",
            },
            {
              id: "4",
              title: "Design Resources",
              url: "https://design.example.com",
              description: "UI/UX design assets and guidelines",
              tags: ["design", "resources"],
              addedAt: "2024-03-17",
              imageUrl: "https://picsum.photos/seed/design/300/200",
            },
          ],
        };

        setLocker(mockData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load locker");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocker();
  }, [id]);

  if (error) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!locker) {
    return null;
  }

  const filteredLinks = locker.links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">{locker.name}</h1>
          <p className="text-muted-foreground mt-2">{locker.description}</p>
        </div>
        <Button onClick={() => setIsAddLinkDialogOpen(true)} size="lg">
          <Plus className="mr-2 h-5 w-5" /> Add Link
        </Button>
      </div>

      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-lg"
        />
      </div>

      {filteredLinks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-xl">
            {searchQuery
              ? "No links found matching your search"
              : "No links added yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLinks.map((link) => (
            <Card
              key={link.id}
              className="relative overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out"
              style={{
                aspectRatio: "16 / 9",
                width: "100%", // Ensure full width
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                style={{
                  backgroundImage: `url(${
                    link.imageUrl || "/placeholder.svg?height=200&width=300"
                  })`,
                }}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 ease-in-out" />

              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="flex justify-between items-start">
                  <a
                    href={link.url}
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopyUrl(link.url)}>
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <p className="text-sm text-white mb-2">{link.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white">
                    <Calendar className="h-3 w-3" />
                    {new Date(link.addedAt).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Tag className="h-3 w-3 text-white" />
                    {link.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/80 px-2 py-1 rounded-full text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {link.title}
                </h2>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AddLinkDialog
        open={isAddLinkDialogOpen}
        onOpenChange={setIsAddLinkDialogOpen}
        lockerId={id}
      />
    </div>
  );
}
