"use client";

import { LockerCard } from "../locker-card";
import { useLockers } from "@/lib/hooks/useLockers";

interface LockerGridProps {
  searchQuery: string;
}

export function LockerGrid({ searchQuery }: LockerGridProps) {
  const { lockers, isLoading } = useLockers();

  const filteredLockers = lockers.filter(
    (locker) =>
      locker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      locker.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-video animate-pulse bg-secondary rounded-lg"
          />
        ))}
      </div>
    );
  }

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