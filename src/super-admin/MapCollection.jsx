import { useState, useMemo } from "react";
import { CheckCircle, Send, MapPin, Clock, Ruler, Cpu, ChevronDown } from "lucide-react";
import MapView from "../components/ui/MapView";
import {
  BINS, TRUCKS, MRF_LOCATIONS, OPTIMIZED_ROUTE,
  CLUSTER_ADMINS, CLUSTERS,
} from "../mock/data";

// ── Per-cluster optimized route data ─────────────────────────────────────────
// Derives a realistic route for each cluster from its full bins
function buildClusterRoute(clusterId, allBins) {
  const fullBins = allBins.filter((b) => b.cluster === clusterId && b.status === "full");
  if (fullBins.length === 0) return null;

  const order = [
    { label: "Truck Depot", type: "depot", posX: 0.10, posY: 0.85 },
    ...fullBins.map((b) => ({
      binId: b.id, label: b.name, street: b.street, posX: b.posX, posY: b.posY,
    })),
  ];

  const distanceKm = parseFloat((fullBins.length * 1.4 + 0.8).toFixed(1));
  const estimatedMinutes = Math.round(fullBins.length * 11 + 8);
  const clusterNum = clusterId.replace("c", "");
  const routeNum = String(parseInt(clusterNum) + 5).padStart(3, "0");

  return {
    routeId: `RT-2025-0${routeNum}`,
    cluster: clusterId,
    bins: fullBins.map((b) => b.id),
    distanceKm,
    estimatedMinutes,
    algorithm: "Nearest Neighbor",
    optimizedAt: new Date().toISOString(),
    order,
  };
}

export default function MapCollection() {
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [optimized, setOptimized]             = useState(false);
  const [sent, setSent]                       = useState(false);
  const [sending, setSending]                 = useState(false);

  // Reset optimized state when cluster changes
  function handleClusterChange(val) {
    setSelectedCluster(val);
    setOptimized(false);
    setSent(false);
  }

  // ── Scoped data ─────────────────────────────────────────────────────────────
  const filteredBins = useMemo(() =>
    selectedCluster === "all" ? BINS : BINS.filter((b) => b.cluster === selectedCluster),
    [selectedCluster]
  );

  const filteredMRFs = useMemo(() =>
    selectedCluster === "all" ? MRF_LOCATIONS : MRF_LOCATIONS.filter((m) => m.cluster === selectedCluster),
    [selectedCluster]
  );

  const fullBinCount = filteredBins.filter((b) => b.status === "full").length;

  // ── Active route ─────────────────────────────────────────────────────────────
  const route = useMemo(() => {
    if (selectedCluster === "all") return OPTIMIZED_ROUTE;
    return buildClusterRoute(selectedCluster, BINS) ?? OPTIMIZED_ROUTE;
  }, [selectedCluster]);

  const clusterLabel = selectedCluster === "all"
    ? "All Clusters"
    : CLUSTERS.find((c) => c.id === selectedCluster)?.label ?? selectedCluster;

  const sentToAdmin = CLUSTER_ADMINS.find((u) =>
    u.assignedCluster === (selectedCluster === "all" ? route.cluster : selectedCluster)
  );

  function handleOptimize() { setOptimized(true); setSent(false); }
  function handleSend() {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  }

  const optimizedAt = new Date(route.optimizedAt).toLocaleTimeString("en-PH", {
    hour: "2-digit", minute: "2-digit",
  });
  const sentAt = new Date().toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });

  // ── Success screen ───────────────────────────────────────────────────────────
  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6">
        <div className="flex items-center justify-center rounded-full"
          style={{ width: 88, height: 88, background: "#E8F5E9" }}>
          <CheckCircle size={48} color="#2E7D32" />
        </div>
        <div className="text-center">
          <h1 className="font-bold text-text-primary" style={{ fontSize: 24 }}>
            Route Sent Successfully!
          </h1>
          <p className="text-text-secondary mt-1" style={{ fontSize: 14 }}>
            The optimized collection route for <strong>{clusterLabel}</strong> has been delivered to{" "}
            <strong>{sentToAdmin?.name ?? "Cluster Admin"}</strong>. They will receive a
            notification on the mobile app.
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 w-full"
          style={{ maxWidth: 480, border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 className="font-semibold text-text-primary mb-4" style={{ fontSize: 15 }}>Route Summary</h3>
          <div className="flex flex-col gap-3">
            <SummaryRow label="Cluster"   value={clusterLabel} />
            <SummaryRow label="Sent To"   value={sentToAdmin?.name ?? "—"} />
            <SummaryRow label="Route ID"  value={route.routeId} />
            <SummaryRow label="Bins"      value={`${route.bins.length} bins`} />
            <SummaryRow label="Distance"  value={`${route.distanceKm} km`} />
            <SummaryRow label="Sent At"   value={sentAt} />
            <div className="flex items-center justify-between">
              <span className="text-text-secondary" style={{ fontSize: 13 }}>Status</span>
              <span className="flex items-center gap-1.5 font-semibold" style={{ fontSize: 13, color: "#2E7D32" }}>
                <span className="rounded-full" style={{ width: 7, height: 7, background: "#2E7D32", display: "inline-block" }} />
                Delivered
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/super-admin/dashboard"
            className="rounded-lg px-5 py-2.5 font-semibold transition-colors"
            style={{ fontSize: 14, border: "1.5px solid #E5E7EB", color: "#6B7280", background: "#fff" }}>
            Back to Dashboard
          </a>
          <a href="/super-admin/routes"
            className="rounded-lg px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
            style={{ fontSize: 14, background: "#2E7D32" }}>
            View All Routes
          </a>
        </div>
      </div>
    );
  }

  // ── Main view ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5">

      {/* Optimized banner */}
      {optimized && (
        <div className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: "#E8F5E9", border: "1px solid #A5D6A7" }}>
          <CheckCircle size={18} color="#2E7D32" />
          <span className="font-semibold text-primary" style={{ fontSize: 14 }}>
            Route Optimized — {clusterLabel}
          </span>
          <span className="text-text-secondary" style={{ fontSize: 13 }}>
            — {route.bins.length} bins · Est. {route.estimatedMinutes} min · {route.distanceKm} km
          </span>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>
            {optimized ? "Optimized Collection Route" : "Map & Collection"}
          </h1>
          {optimized && (
            <p className="text-text-secondary mt-0.5" style={{ fontSize: 14 }}>
              {route.bins.length} bins · Est. {route.estimatedMinutes} min · {route.distanceKm} km · {clusterLabel}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* ── Cluster selector ── */}
          <div className="flex flex-col gap-1">
            <label className="text-text-muted font-medium" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Optimize for
            </label>
            <div className="relative flex items-center">
              <select
                value={selectedCluster}
                onChange={(e) => handleClusterChange(e.target.value)}
                className="appearance-none rounded-lg pl-3 pr-9 py-2 font-semibold outline-none transition-colors"
                style={{
                  fontSize: 13,
                  border: "1.5px solid #E5E7EB",
                  background: "#fff",
                  color: "#1A1A1A",
                  minWidth: 200,
                  cursor: "pointer",
                }}
              >
                <option value="all">🏙 All Clusters (City-wide)</option>
                {CLUSTERS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 pointer-events-none text-text-muted" />
            </div>
          </div>

          {/* Full bins count badge */}
          {selectedCluster !== "all" && (
            <div className="flex flex-col gap-1">
              <label className="text-text-muted font-medium" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Full bins
              </label>
              <span
                className="rounded-lg px-3 py-2 font-bold text-center"
                style={{
                  fontSize: 13,
                  background: fullBinCount > 0 ? "#FFEBEE" : "#E8F5E9",
                  color: fullBinCount > 0 ? "#D32F2F" : "#2E7D32",
                  border: `1.5px solid ${fullBinCount > 0 ? "#FFCDD2" : "#C8E6C9"}`,
                  minWidth: 60,
                }}
              >
                {fullBinCount} {fullBinCount === 1 ? "bin" : "bins"}
              </span>
            </div>
          )}

          {/* Action button */}
          <div className="flex flex-col gap-1">
            <label className="text-text-muted font-medium" style={{ fontSize: 11, opacity: 0 }}>
              Action
            </label>
            {!optimized ? (
              <button
                onClick={handleOptimize}
                disabled={selectedCluster !== "all" && fullBinCount === 0}
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontSize: 13, background: "#2E7D32" }}
                title={selectedCluster !== "all" && fullBinCount === 0 ? "No full bins in this cluster" : ""}
              >
                <Cpu size={14} />
                Generate Optimized Route
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ fontSize: 13, background: "#2E7D32", opacity: sending ? 0.7 : 1 }}
              >
                <Send size={14} />
                {sending ? "Sending…" : "Send to Collector Admin"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* No full bins warning */}
      {selectedCluster !== "all" && fullBinCount === 0 && !optimized && (
        <div className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: "#FFF3E0", border: "1px solid #FFE0B2" }}>
          <MapPin size={16} color="#F57C00" className="flex-shrink-0" />
          <p style={{ fontSize: 13, color: "#E65100" }}>
            No full bins reported in <strong>{clusterLabel}</strong>. Select a different cluster or switch to City-wide view.
          </p>
        </div>
      )}

      {/* Map + sidebar */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 380px" }}>
        {/* Map */}
        <div className="bg-white rounded-xl p-4"
          style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          {/* Cluster legend strip */}
          {selectedCluster !== "all" && (
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="rounded-full px-3 py-1 font-semibold text-white"
                style={{ fontSize: 12, background: "#2E7D32" }}>
                {clusterLabel}
              </span>
              <span className="text-text-muted" style={{ fontSize: 12 }}>
                {filteredBins.length} bins · {filteredBins.filter((b) => b.status === "full").length} full
              </span>
            </div>
          )}
          <MapView
            bins={filteredBins}
            trucks={TRUCKS}
            mrfs={filteredMRFs}
            routeOrder={optimized ? route.order : []}
            showRoute={optimized}
            height={500}
          />
        </div>

        {/* Route details panel */}
        <div className="bg-white rounded-xl p-5 flex flex-col gap-4"
          style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          {!optimized ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
              <MapPin size={40} color="#9CA3AF" />
              <div className="text-center">
                <p className="text-text-muted" style={{ fontSize: 14 }}>
                  {selectedCluster === "all"
                    ? "Select a cluster and click \"Generate Optimized Route\" to calculate the best collection path."
                    : `Click "Generate Optimized Route" to optimize collection for ${clusterLabel}.`}
                </p>
                {selectedCluster !== "all" && fullBinCount > 0 && (
                  <p className="text-text-secondary mt-2 font-medium" style={{ fontSize: 13 }}>
                    {fullBinCount} full {fullBinCount === 1 ? "bin" : "bins"} ready for collection
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-text-primary" style={{ fontSize: 17 }}>Route Details</h2>
                <span className="rounded-full px-2.5 py-0.5 font-semibold"
                  style={{ fontSize: 11, background: "#E8F5E9", color: "#2E7D32" }}>
                  {clusterLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DetailTile icon={<Ruler size={14} color="#6B7280" />}    label="Total Distance"  value={`${route.distanceKm} km`} />
                <DetailTile icon={<Clock size={14} color="#6B7280" />}    label="Est. Time"       value={`${route.estimatedMinutes} min`} />
                <DetailTile icon={<MapPin size={14} color="#6B7280" />}   label="Bins to Collect" value={route.bins.length} />
                <DetailTile icon={<Cpu size={14} color="#6B7280" />}      label="Algorithm"       value="Nearest Neighbor" />
              </div>

              {/* Assigned admin */}
              {sentToAdmin && (
                <div className="rounded-lg px-3 py-2.5 flex items-center gap-2"
                  style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                  <div className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 28, height: 28, background: "#E8F5E9" }}>
                    <span style={{ fontSize: 12 }}>👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary" style={{ fontSize: 13 }}>{sentToAdmin.name}</p>
                    <p className="text-text-muted" style={{ fontSize: 11 }}>Cluster Admin · {clusterLabel}</p>
                  </div>
                </div>
              )}

              <div className="text-text-muted" style={{ fontSize: 12 }}>Optimized at {optimizedAt}</div>

              <div>
                <h3 className="font-semibold text-text-primary mb-3" style={{ fontSize: 14 }}>Collection Order</h3>
                <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: 200 }}>
                  {route.order.map((stop, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-white"
                        style={{ width: 26, height: 26, fontSize: 11, background: stop.type === "depot" ? "#F57C00" : "#2E7D32" }}>
                        {stop.type === "depot" ? "D" : i}
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary" style={{ fontSize: 13 }}>{stop.label}</div>
                        {stop.street && <div className="text-text-muted" style={{ fontSize: 11 }}>{stop.street}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleSend} disabled={sending}
                className="w-full rounded-lg py-2.5 font-semibold text-white mt-auto hover:opacity-90 transition-opacity"
                style={{ fontSize: 14, background: "#2E7D32", opacity: sending ? 0.7 : 1 }}>
                {sending ? "Sending…" : "Send to Collector Admin"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-secondary" style={{ fontSize: 13 }}>{label}</span>
      <span className="font-semibold text-text-primary" style={{ fontSize: 13 }}>{value}</span>
    </div>
  );
}

function DetailTile({ icon, label, value }) {
  return (
    <div className="rounded-lg p-3 flex flex-col gap-1"
      style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-text-muted" style={{ fontSize: 11 }}>{label}</span>
      </div>
      <div className="font-semibold text-text-primary" style={{ fontSize: 14 }}>{value}</div>
    </div>
  );
}
