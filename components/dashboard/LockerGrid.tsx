"use client";

import { LockerCard } from "../locker-card";

interface LockerGridProps {
  searchQuery: string;
}

export function LockerGrid({ searchQuery }: LockerGridProps) {
  // Mock data - replace with actual data fetching
  const lockers = [
    {
      id: "1",
      title: "Development Resources",
      description: "Useful links for web development",
      linkCount: 12,
      isPublic: true,
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
    },
    {
      id: "2",
      title: "Design Inspiration",
      description: "UI/UX design references",
      linkCount: 8,
      isPublic: false,
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    },
    {
      id: "3",
      title: "Reading List",
      description: "Articles to read later",
      linkCount: 15,
      isPublic: false,
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500&h=300&fit=crop",
    },
  ];

  const filteredLockers = lockers.filter(
    (locker) =>
      locker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      locker.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredLockers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {searchQuery
            ? "No lockers found matching your search"
            : "Create your first locker to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLockers.map((locker) => (
        <LockerCard key={locker.id} {...locker} />
      ))}
    </div>
  );
}