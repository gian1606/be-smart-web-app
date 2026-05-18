/**
 * AdBanner — fixed right-side partner/sponsor panel (Cluster Admin only)
 * Per design spec: 200px wide, full height, light gray background
 */

const PARTNERS = [
  {
    id: "p1",
    name: "EcoGreen PH",
    tagline: "Sustainable waste solutions",
    url: "#",
    initials: "EG",
    color: "#2E7D32",
  },
  {
    id: "p2",
    name: "CleanCity Corp",
    tagline: "Partnering for a cleaner tomorrow",
    url: "#",
    initials: "CC",
    color: "#1976D2",
  },
  {
    id: "p3",
    name: "BatangasRecycles",
    tagline: "Local recycling made easy",
    url: "#",
    initials: "BR",
    color: "#F57C00",
  },
];

export default function AdBanner() {
  return (
    <aside
      className="fixed right-0 top-0 h-screen flex flex-col z-20"
      style={{
        width: 200,
        background: "#F0F4F0",
        borderLeft: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <div
        className="px-4 pt-5 pb-3 border-b"
        style={{ borderColor: "#E5E7EB" }}
      >
        <span
          className="uppercase tracking-widest font-semibold"
          style={{ fontSize: 10, color: "#9CA3AF" }}
        >
          Partners &amp; Sponsors
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {PARTNERS.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl p-3 flex flex-col gap-2"
            style={{ border: "1px solid #E5E7EB" }}
          >
            {/* Logo placeholder */}
            <div
              className="flex items-center justify-center rounded-lg font-bold text-white"
              style={{
                width: 40,
                height: 40,
                background: p.color,
                fontSize: 14,
              }}
            >
              {p.initials}
            </div>
            <div>
              <div className="font-semibold text-text-primary" style={{ fontSize: 12 }}>
                {p.name}
              </div>
              <div className="text-text-muted mt-0.5" style={{ fontSize: 11, lineHeight: 1.4 }}>
                {p.tagline}
              </div>
            </div>
            <a
              href={p.url}
              className="flex items-center gap-1 font-semibold transition-opacity hover:opacity-75"
              style={{ fontSize: 11, color: "#2E7D32" }}
            >
              Visit →
            </a>
          </div>
        ))}

        {/* Placeholder ad slot */}
        <div
          className="rounded-xl flex items-center justify-center"
          style={{
            height: 100,
            border: "1.5px dashed #D1D5DB",
            background: "rgba(255,255,255,0.5)",
          }}
        >
          <span className="text-text-muted text-center px-2" style={{ fontSize: 11 }}>
            Ad slot available
          </span>
        </div>
      </div>
    </aside>
  );
}
