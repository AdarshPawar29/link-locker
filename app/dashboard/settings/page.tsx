import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <SettingsForm />
    </div>
  )
}