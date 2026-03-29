"use client";

import {
  Bookmark,
  CalendarDays,
  Home,
  MessageCircle,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { logAnalytics } from "@/lib/analytics";

const NAV = [
  { href: "/", label: "여행홈", Icon: Home },
  { href: "/chat", label: "배낭톡", Icon: MessageCircle },
  { href: "/schedule", label: "일정", Icon: CalendarDays },
  { href: "/saved", label: "저장", Icon: Bookmark },
  { href: "/tools", label: "여행도구", Icon: Wrench },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-white pb-[env(safe-area-inset-bottom)]"
      aria-label="하단 메뉴"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-2">
        {NAV.map(({ href, label, Icon }) => {
          const active =
            href === "/"
              ? pathname === "/" || pathname === "/home"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href === "/" ? "/" : href}
              onClick={() =>
                logAnalytics("bottom_nav_click", { href, label, pathname })
              }
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 pb-2 text-[11px] font-medium ${
                active ? "text-triple-blue" : "text-muted"
              }`}
            >
              <Icon
                className="size-6 shrink-0"
                strokeWidth={active ? 2.25 : 2}
                aria-hidden
              />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
