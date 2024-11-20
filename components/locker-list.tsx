"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LockerCard } from "@/components/locker-card"
import { CreateLockerDialog } from "@/components/create-locker-dialog"

export function LockerList() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Lockers</h1>
        <Button onClick={() => setOpen(true)}>Create New Locker</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LockerCard
          title="Development Resources"
          description="Useful links for web development"
          linkCount={12}
          isPublic={true}
        />
        <LockerCard
          title="Design Inspiration"
          description="UI/UX design references"
          linkCount={8}
          isPublic={false}
        />
        <LockerCard
          title="Reading List"
          description="Articles to read later"
          linkCount={15}
          isPublic={false}
        />
      </div>

      <CreateLockerDialog open={open} onOpenChange={setOpen} />
    </>
  )
}