"use client";

import type { ReactNode } from "react";

/**
 * 체크리스트 규정 패널과 동일한 높이·투명도 전환 (grid 0fr/1fr + opacity).
 * 여러 항목을 각각 독립 토글할 때 재사용합니다.
 */
export function CollapsibleChevronPanel({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-out"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={`mt-2 border-t border-[#EEEEEE] pt-3 transition-opacity duration-200 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
