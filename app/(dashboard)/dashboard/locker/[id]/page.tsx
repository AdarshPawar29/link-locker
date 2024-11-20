import { LockerView } from "@/components/locker-view"

export default function LockerPage({ params }: { params: { id: string } }) {
  return <LockerView id={params.id} />
}