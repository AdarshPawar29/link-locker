"use client";

import { useState } from "react";
import { LockerGrid } from "./LockerGrid";
import { SearchInput } from "../shared/SearchInput";
import { PageHeader } from "../shared/PageHeader";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { CreateLockerDialog } from "../create-locker-dialog";

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

      <div className="max-w-xl">
        <SearchInput
          onSearch={setSearchQuery}
          placeholder="Search lockers..."
        />
      </div>

      <LockerGrid searchQuery={searchQuery} />

      <CreateLockerDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}