import { DashboardNav } from "@/components/dashboard-nav";
import { LockerList } from "@/components/locker-list";

export default function DashboardPage() {
  return (
    <div className="container space-y-8 py-8">
      <DashboardNav />
      <LockerList />
    </div>
  );
}
