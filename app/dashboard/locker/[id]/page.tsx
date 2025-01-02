import { Suspense } from "react";
import { LockerView } from "@/components/locker-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function LockerPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<LockerSkeleton />}>
      <LockerView id={params.id} />
    </Suspense>
  );
}

function LockerSkeleton() {
  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  // Include all possible locker IDs that could be accessed
  const lockerIds = [
    "development-resources",
    "design-inspiration",
    "reading-list",
    "1",
    "2",
    "3",
    "4"
  ];
  
  return lockerIds.map((id) => ({
    id: id.toString()
  }));
}