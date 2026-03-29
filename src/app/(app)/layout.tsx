import { MainShell } from "@/components/layout/MainShell";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MainShell>{children}</MainShell>;
}
