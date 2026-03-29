import { BottomNav } from "@/components/nav/BottomNav";
import { TripProviders } from "@/components/layout/TripProviders";

export function MainShell({ children }: { children: React.ReactNode }) {
  return (
    <TripProviders>
      <div className="mx-auto min-h-screen max-w-lg bg-white pb-24 shadow-sm">
        {children}
        <BottomNav />
      </div>
    </TripProviders>
  );
}
