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
            },
            {
              id: "2",
              title: "Team Calendar",
              url: "https://calendar.example.com",
              description: "Team schedule and important dates",
              tags: ["calendar", "team"],
              addedAt: "2024-03-19",
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
    <div className="container py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{locker.name}</h1>
          <p className="text-muted-foreground mt-1">{locker.description}</p>
        </div>
        <Button onClick={() => setIsAddLinkDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Link
        </Button>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredLinks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery
              ? "No links found matching your search"
              : "No links added yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredLinks.map((link) => (
            <Card key={link.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
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
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(link.addedAt).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {link.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
