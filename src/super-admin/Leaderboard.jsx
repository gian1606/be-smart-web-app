import { useState } from "react";
import { Trophy, Medal, Star, MapPin, Calendar } from "lucide-react";
import { SA_LEADERBOARD_PERIODS } from "../mock/data";

const BADGE_CONFIG = {
  gold:   { bg: "#FEF3C7", color: "#D97706", label: "Gold",   icon: "🥇" },
  silver: { bg: "#F3F4F6", color: "#6B7280", label: "Silver", icon: "🥈" },
  bronze: { bg: "#FEF0E7", color: "#C2410C", label: "Bronze", icon: "🥉" },
};

const MONTH_OPTIONS = [
  { key: "2025-05", label: "May 2025" },
  { key: "2025-04", label: "April 2025" },
  { key: "2025-03", label: "March 2025" },
];

const CURRENT_MONTH = "2025-05";

export default function Leaderboard() {
  const [month, setMonth] = useState(CURRENT_MONTH);

  const data = SA_LEADERBOARD_PERIODS[month] ?? [];
  const ranked = data.map((r, i) => ({ ...r, displayRank: i + 1 }));
  const topThree = ranked.slice(0, 3);
  const selectedLabel = MONTH_OPTIONS.find((o) => o.key === month)?.label ?? month;

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>
            Barangay Leaderboard
          </h1>
          <p className="text-text-secondary mt-0.5" style={{ fontSize: 14 }}>
            City-wide barangay rankings by household waste reporting activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "#E8F5E9", border: "1px solid #A5D6A7" }}
          >
            <MapPin size={14} color="#2E7D32" />
            <span className="font-semibold" style={{ fontSize: 13, color: "#2E7D32" }}>
              Batangas City
            </span>
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}
          >
            <Trophy size={14} color="#D97706" />
            <span className="font-semibold" style={{ fontSize: 13, color: "#D97706" }}>
              {ranked.length} Barangays
            </span>
          </div>
        </div>
      </div>

      {/* Month filter */}
      <div
        className="bg-white rounded-xl px-4 py-3 flex items-center gap-3"
        style={{ border: "1px solid #E5E7EB" }}
      >
        <Calendar size={15} color="#6B7280" />
        <label
          className="font-medium text-text-secondary"
          style={{ fontSize: 13 }}
          htmlFor="month-select"
        >
          Month:
        </label>
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg px-3 py-2 outline-none"
          style={{
            fontSize: 13,
            border: "1.5px solid #E5E7EB",
            background: "#F9FAFB",
            color: "#1A1A1A",
            minWidth: 180,
          }}
        >
          {MONTH_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}{opt.key === CURRENT_MONTH ? " (Current)" : ""}
            </option>
          ))}
        </select>
        <span className="ml-auto text-text-muted" style={{ fontSize: 12 }}>
          {selectedLabel}
        </span>
      </div>

      {/* Podium — top 3 */}
      {topThree.length >= 1 && (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[topThree[1], topThree[0], topThree[2]].map((r, podiumIdx) => {
            if (!r) return <div key={podiumIdx} />;
            const isFirst = r.displayRank === 1;
            return (
              <div
                key={r.barangayId}
                className="flex flex-col items-center rounded-xl p-5 gap-3"
                style={{
                  background: isFirst ? "#FFFBEB" : "#fff",
                  border: isFirst ? "2px solid #FDE68A" : "1px solid #E5E7EB",
                  boxShadow: isFirst
                    ? "0 4px 16px rgba(217,119,6,0.12)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                  marginTop: isFirst ? 0 : 16,
                }}
              >
                <div style={{ fontSize: 36 }}>
                  {r.displayRank === 1 ? "🥇" : r.displayRank === 2 ? "🥈" : "🥉"}
                </div>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 52,
                    height: 52,
                    background:
                      r.displayRank === 1 ? "#D97706" : r.displayRank === 2 ? "#9CA3AF" : "#C2410C",
                  }}
                >
                  <MapPin size={22} color="#fff" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-text-primary" style={{ fontSize: 15 }}>
                    {r.name}
                  </div>
                  <div className="text-text-muted" style={{ fontSize: 12 }}>
                    {r.cluster}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-bold"
                    style={{ fontSize: 24, color: isFirst ? "#D97706" : "#1A1A1A" }}
                  >
                    {r.pointsEarned.toLocaleString()}
                  </div>
                  <div className="text-text-muted" style={{ fontSize: 11 }}>
                    Eco Points
                  </div>
                </div>
                <div
                  className="rounded-full px-3 py-1 font-medium"
                  style={{ fontSize: 12, background: "#E8F5E9", color: "#2E7D32" }}
                >
                  {r.collectionRate}% collection rate
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full rankings table */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <div
          className="px-5 py-3 border-b flex items-center justify-between"
          style={{ borderColor: "#E5E7EB", background: "#F9FAFB" }}
        >
          <div className="flex items-center gap-2">
            <Medal size={15} color="#6B7280" />
            <span
              className="font-semibold text-text-secondary uppercase tracking-wide"
              style={{ fontSize: 12 }}
            >
              Full Rankings — Batangas City
            </span>
          </div>
          <span className="text-text-muted" style={{ fontSize: 12 }}>
            {selectedLabel}
          </span>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {["Rank", "Barangay", "Cluster", "Reports", "Collection Rate", "Eco Points", "Badge"].map((h) => (
                <th
                  key={h}
                  className="text-left font-semibold uppercase tracking-wide px-5 py-3"
                  style={{ fontSize: 12, color: "#6B7280" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ranked.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-text-muted py-10" style={{ fontSize: 14 }}>
                  No data for this period.
                </td>
              </tr>
            ) : (
              ranked.map((r, i) => {
                const badge = r.badge ? BADGE_CONFIG[r.badge] : null;
                return (
                  <tr
                    key={r.barangayId}
                    style={{
                      background:
                        r.displayRank <= 3
                          ? r.displayRank === 1 ? "#FFFBEB" : "#FAFAFA"
                          : i % 2 === 0 ? "#fff" : "#FAFAFA",
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {/* Rank */}
                    <td className="px-5 py-3">
                      {r.displayRank <= 3 ? (
                        <span style={{ fontSize: 18 }}>
                          {r.displayRank === 1 ? "🥇" : r.displayRank === 2 ? "🥈" : "🥉"}
                        </span>
                      ) : (
                        <span
                          className="font-bold text-text-secondary"
                          style={{ fontSize: 14, minWidth: 24, display: "inline-block", textAlign: "center" }}
                        >
                          {r.displayRank}
                        </span>
                      )}
                    </td>

                    {/* Barangay */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex-shrink-0 flex items-center justify-center rounded-full"
                          style={{ width: 32, height: 32, background: "#E8F5E9" }}
                        >
                          <MapPin size={15} color="#2E7D32" />
                        </div>
                        <span className="font-semibold text-text-primary" style={{ fontSize: 13 }}>
                          {r.name}
                        </span>
                      </div>
                    </td>

                    {/* Cluster */}
                    <td className="px-5 py-3 text-text-secondary" style={{ fontSize: 13 }}>
                      {r.cluster}
                    </td>

                    {/* Reports */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <Star size={13} color="#F57C00" />
                        <span className="font-semibold text-text-primary" style={{ fontSize: 13 }}>
                          {r.reportsSubmitted}
                        </span>
                      </div>
                    </td>

                    {/* Collection Rate */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="rounded-full overflow-hidden"
                          style={{ width: 80, height: 6, background: "#E5E7EB" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${r.collectionRate}%`,
                              background:
                                r.collectionRate >= 90
                                  ? "#2E7D32"
                                  : r.collectionRate >= 75
                                  ? "#F57C00"
                                  : "#D32F2F",
                            }}
                          />
                        </div>
                        <span className="font-semibold text-text-primary" style={{ fontSize: 13 }}>
                          {r.collectionRate}%
                        </span>
                      </div>
                    </td>

                    {/* Points */}
                    <td className="px-5 py-3">
                      <span className="font-bold text-primary" style={{ fontSize: 14 }}>
                        {r.pointsEarned.toLocaleString()}
                      </span>
                      <span className="text-text-muted ml-1" style={{ fontSize: 12 }}>pts</span>
                    </td>

                    {/* Badge */}
                    <td className="px-5 py-3">
                      {badge ? (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium"
                          style={{ fontSize: 12, background: badge.bg, color: badge.color }}
                        >
                          {badge.icon} {badge.label}
                        </span>
                      ) : (
                        <span className="text-text-muted" style={{ fontSize: 12 }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
