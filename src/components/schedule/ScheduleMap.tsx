"use client";

/** 도시별 OSM 임베드 (데모용 bbox) */
const EMBED_BY_CITY_ID: Record<string, string> = {
  osaka:
    "https://www.openstreetmap.org/export/embed.html?bbox=135.38%2C34.58%2C135.65%2C34.78&layer=mapnik",
  tokyo:
    "https://www.openstreetmap.org/export/embed.html?bbox=139.55%2C35.62%2C139.88%2C35.78&layer=mapnik",
  fukuoka:
    "https://www.openstreetmap.org/export/embed.html?bbox=130.32%2C33.52%2C130.48%2C33.64&layer=mapnik",
  sapporo:
    "https://www.openstreetmap.org/export/embed.html?bbox=141.28%2C43.02%2C141.42%2C43.12&layer=mapnik",
  jeju:
    "https://www.openstreetmap.org/export/embed.html?bbox=126.45%2C33.42%2C126.6%2C33.52&layer=mapnik",
  busan:
    "https://www.openstreetmap.org/export/embed.html?bbox=129.02%2C35.08%2C129.2%2C35.2&layer=mapnik",
  seoul:
    "https://www.openstreetmap.org/export/embed.html?bbox=126.92%2C37.52%2C127.08%2C37.62&layer=mapnik",
  default:
    "https://www.openstreetmap.org/export/embed.html?bbox=135.38%2C34.58%2C135.65%2C34.78&layer=mapnik",
};

export function ScheduleMap({ cityId, label }: { cityId?: string; label: string }) {
  const src = EMBED_BY_CITY_ID[cityId ?? ""] ?? EMBED_BY_CITY_ID.default;

  return (
    <section className="px-4 pt-2">
      <div className="overflow-hidden rounded-2xl border border-[#EEEEEE] bg-[#F5F6F7] shadow-sm">
        <div className="relative h-[168px] w-full">
          <iframe
            title={`${label} 지도`}
            src={src}
            className="pointer-events-none h-full w-full border-0 grayscale-[0.15] contrast-[1.02]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
          <a
            href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(label)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-[12px] font-semibold text-[#3182F6] shadow-md backdrop-blur-sm"
          >
            지도에서 열기
          </a>
        </div>
      </div>
    </section>
  );
}
