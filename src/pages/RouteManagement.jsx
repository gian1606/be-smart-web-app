import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Send, ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "../components/ui/StatusBadge";
import { ROUTES, CLUSTERS, CLUSTER_ADMINS } from "../mock/data";

const PAGE_SIZE = 5;

export default function RouteManagement() {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [clusterFilter, setClusterFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Filter
  const filtered = ROUTES.filter((r) => {
    if (clusterFilter !== "all" && r.cluster !== clusterFilter) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (dateFrom && r.date < dateFrom) return false;
    if (dateTo && r.date > dateTo) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function getClusterLabel(id) {
    return CLUSTERS.find((c) => c.id === id)?.label ?? id;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>
          Route Management
        </h1>
        <button
          onClick={() => navigate("/map")}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ fontSize: 14, background: "#2E7D32" }}
        >
          <Plus size={15} />
          Generate New Route
        </button>
      </div>

      {/* Filters */}
      <div
        className="bg-white rounded-xl p-4 flex items-center gap-4 flex-wrap"
        style={{ border: "1px solid #E5E7EB" }}
      >
        <div className="flex items-center gap-2">
          <label className="text-text-secondary font-medium" style={{ fontSize: 13 }}>From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
            className="rounded-lg px-3 py-1.5 outline-none"
            style={{ fontSize: 13, border: "1.5px solid #E5E7EB", background: "#F9FAFB" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-text-secondary font-medium" style={{ fontSize: 13 }}>To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
            className="rounded-lg px-3 py-1.5 outline-none"
            style={{ fontSize: 13, border: "1.5px solid #E5E7EB", background: "#F9FAFB" }}
          />
        </div>

        <select
          value={clusterFilter}
          onChange={(e) => { setClusterFilter(e.target.value); setPage(1); }}
          className="rounded-lg px-3 py-1.5 outline-none"
          style={{ fontSize: 13, border: "1.5px solid #E5E7EB", background: "#F9FAFB", color: "#1A1A1A" }}
        >
          <option value="all">All Clusters</option>
          {CLUSTERS.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-lg px-3 py-1.5 outline-none"
          style={{ fontSize: 13, border: "1.5px solid #E5E7EB", background: "#F9FAFB", color: "#1A1A1A" }}
        >
          <option value="all">All Statuses</option>
          <option value="delivered">Delivered</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {["Route ID", "Date", "Cluster", "Bins", "Distance", "Sent To", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left font-semibold uppercase tracking-wide px-4 py-3"
                  style={{ fontSize: 12, color: "#6B7280" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-text-muted py-10" style={{ fontSize: 14 }}>
                  No routes match the selected filters.
                </td>
              </tr>
            ) : (
              paginated.map((r, i) => (
                <tr
                  key={r.id}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                    borderBottom: "1px solid #F3F4F6",
                  }}
                >
                  <td className="px-4 py-3 font-semibold text-primary" style={{ fontSize: 13 }}>
                    {r.routeId}
                  </td>
                  <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>
                    {r.date}
                  </td>
                  <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>
                    {getClusterLabel(r.cluster)}
                  </td>
                  <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>
                    {r.bins.length} bins
                  </td>
                  <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>
                    {r.distanceKm} km
                  </td>
                  <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>
                    {r.sentTo}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View"
                      >
                        <Eye size={15} color="#6B7280" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Resend"
                      >
                        <Send size={15} color="#2E7D32" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{ borderColor: "#F3F4F6" }}
        >
          <span className="text-text-muted" style={{ fontSize: 13 }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} routes
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={16} color="#6B7280" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-8 h-8 rounded-lg font-medium transition-colors"
                style={{
                  fontSize: 13,
                  background: p === page ? "#2E7D32" : "transparent",
                  color: p === page ? "#fff" : "#6B7280",
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={16} color="#6B7280" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
