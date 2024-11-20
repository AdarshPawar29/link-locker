"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Lock, Unlock, Plus, ExternalLink, Search, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddLinkDialog } from "@/components/add-link-dialog"

interface LockerViewProps {
  id: string
}

export function LockerView({ id }: LockerViewProps) {
  const [addLinkOpen, setAddLinkOpen] = useState(false)

  // Mock data - in a real app, this would come from your backend
  const locker = {
    id,
    title: "Development Resources",
    description: "Useful links for web development",
    isPublic: true,
    links: [
      {
        id: "1",
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        tags: ["nextjs", "framework"],
        addedAt: "2024-01-20",
      },
      {
        id: "2",
        title: "Tailwind CSS",
        url: "https://tailwindcss.com",
        tags: ["css", "styling"],
        addedAt: "2024-01-19",
      },
    ],
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">{locker.title}</h1>
            {locker.isPublic ? (
              <Unlock className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Lock className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <p className="text-muted-foreground">{locker.description}</p>
        </div>
        <Button onClick={() => setAddLinkOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Link
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search links..."
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locker.links.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {link.title}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {link.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{link.addedAt}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddLinkDialog open={addLinkOpen} onOpenChange={setAddLinkOpen} />
    </div>
  )
}