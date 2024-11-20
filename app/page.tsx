import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Link as LinkIcon, Tag, Share2 } from "lucide-react"

export default function Home() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl py-6 space-y-8">
      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Your Digital{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-neutral-900 to-neutral-400 block sm:inline-block">
              Link Vault
            </span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 px-4">
            Store, organize, and share your important links in one secure place.
            Create public or private lockers for different purposes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Create Your First Locker
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="relative max-w-xl mx-auto px-4">
        <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your lockers..."
          className="pl-10"
        />
      </div>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
        <Card className="p-6 space-y-2 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center">
            <LinkIcon className="h-12 w-12 mb-4" />
          </div>
          <h3 className="text-lg font-semibold text-center">Organize Links</h3>
          <p className="text-sm text-muted-foreground text-center">
            Create multiple lockers to organize your links by topic, project, or purpose.
          </p>
        </Card>
        <Card className="p-6 space-y-2 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center">
            <Tag className="h-12 w-12 mb-4" />
          </div>
          <h3 className="text-lg font-semibold text-center">Smart Tagging</h3>
          <p className="text-sm text-muted-foreground text-center">
            Add tags to your links for easy categorization and quick search.
          </p>
        </Card>
        <Card className="p-6 space-y-2 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-center">
            <Share2 className="h-12 w-12 mb-4" />
          </div>
          <h3 className="text-lg font-semibold text-center">Share & Collaborate</h3>
          <p className="text-sm text-muted-foreground text-center">
            Share your lockers with others or keep them private. Perfect for teams.
          </p>
        </Card>
      </section>
    </div>
  )
}