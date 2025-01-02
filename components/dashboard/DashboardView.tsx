"use client";

import { useState } from "react";
import { LockerGrid } from "./LockerGrid";
import { SearchInput } from "../shared/SearchInput";
import { PageHeader } from "../shared/PageHeader";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { CreateLockerDialog } from "../create-locker-dialog";
import { DashboardStats } from "./DashboardStats";
import { RecentActivity } from "./RecentActivity";

export function DashboardView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container py-8 space-y-8">
      <PageHeader
        title="My Lockers"
        description="Manage and organize your link collections"
        action={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Locker
          </Button>
        }
      />

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="max-w-xl">
            <SearchInput
              onSearch={setSearchQuery}
              placeholder="Search lockers..."
            />
          </div>

          <LockerGrid searchQuery={searchQuery} />
        </div>

        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      <CreateLockerDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}