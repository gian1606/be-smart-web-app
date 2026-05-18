import { useState } from "react";
import { CheckCircle, Send, MapPin, Clock, Ruler, Cpu } from "lucide-react";
import MapView from "../../components/ui/MapView";
import { BINS, TRUCKS, OPTIMIZED_ROUTE, CLUSTER_ADMINS, CLUSTERS } from "../mock/data";

export default function MapCollection() {
  const [optimized, setOptimized] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const route = OPTIMIZED_ROUTE;
  const routeBins = route.bins.map((id) => BINS.find((b) => b.id === id)).filter(Boolean);
  const clusterLabel = CLUSTERS.find((c) => c.id === route.cluster)?.label ?? route.cluster;
  const sentToAdmin = CLUSTER_ADMINS.find((u) => u.assignedCluster === route.cluster);

  function handleOptimize() { setOptimized(true); setSent(false); }
  function handleSend() {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  }

  const optimizedAt = new Date(route.optimizedAt).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
  const sentAt = new Date().toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6">
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 88, height: 88, background: "#E8F5E9" }}
        >
          <CheckCircle size={48} color="#2E7D32" />
        </div>
        <div className="text-center">
          <h1 className="font-bold text-text-primary" style={{ fontSize: 24 }}>
            Route Sent Successfully!
          </h1>
          <p className="text-text-secondary mt-1" style={{ fontSize: 14 }}>
            The optimized collection route has been delivered to{" "}
            <strong>{sentToAdmin?.name ?? "Cluster Admin"}</strong>. They will receive a
            notification on the mobile app.
          </p>
        </div>
        <div
          className="bg-white rounded-xl p-5 w-full"
          style={{ maxWidth: 480, border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <h3 className="font-semibold text-text-primary mb-4" style={{ fontSize: 15 }}>
            Route Summary
          </h3>
          <div className="flex flex-col gap-3">
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
          <a
            href="/super-admin/dashboard"
            className="rounded-lg px-5 py-2.5 font-semibold transition-colors"
            style={{ fontSize: 14, border: "1.5px solid #E5E7EB", color: "#6B7280", background: "#fff" }}
          >
            Back to Dashboard
          </a>
          <a
            href="/super-admin/routes"
            className="rounded-lg px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
            style={{ fontSize: 14, background: "#2E7D32" }}
          >
            View All Routes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {optimized && (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: "#E8F5E9", border: "1px solid #A5D6A7" }}
        >
          <CheckCircle size={18} color="#2E7D32" />
          <span className="font-semibold text-primary" style={{ fontSize: 14 }}>
            Route Optimized Successfully
          </span>
          <span className="text-text-secondary" style={{ fontSize: 13 }}>
            — {route.bins.length} bins · Est. {route.estimatedMinutes} min · {route.distanceKm} km
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
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
        <div className="flex items-center gap-3">
          {!optimized ? (
            <button
              onClick={handleOptimize}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ fontSize: 14, background: "#2E7D32" }}
            >
              <Cpu size={15} />
              Generate Optimized Route
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={sending}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ fontSize: 14, background: "#2E7D32", opacity: sending ? 0.7 : 1 }}
            >
              <Send size={15} />
              {sending ? "Sending…" : "Send to Collector Admin"}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 380px" }}>
        <div
          className="bg-white rounded-xl p-4"
          style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <MapView
            bins={BINS}
            trucks={TRUCKS}
            mrfs={[]}
            routeOrder={optimized ? route.order : []}
            showRoute={optimized}
            height={500}
          />
        </div>

        <div
          className="bg-white rounded-xl p-5 flex flex-col gap-4"
          style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          {!optimized ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
              <MapPin size={40} color="#9CA3AF" />
              <p className="text-text-muted text-center" style={{ fontSize: 14 }}>
                Click "Generate Optimized Route" to calculate the best collection path for full bins.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-semibold text-text-primary" style={{ fontSize: 17 }}>Route Details</h2>
              <div className="grid grid-cols-2 gap-3">
                <DetailTile icon={<Ruler size={14} color="#6B7280" />} label="Total Distance" value={`${route.distanceKm} km`} />
                <DetailTile icon={<Clock size={14} color="#6B7280" />} label="Est. Time" value={`${route.estimatedMinutes} min`} />
                <DetailTile icon={<MapPin size={14} color="#6B7280" />} label="Bins to Collect" value={route.bins.length} />
                <DetailTile icon={<Cpu size={14} color="#6B7280" />} label="Algorithm" value="Nearest Neighbor" />
              </div>
              <div className="text-text-muted" style={{ fontSize: 12 }}>Optimized at {optimizedAt}</div>
              <div>
                <h3 className="font-semibold text-text-primary mb-3" style={{ fontSize: 14 }}>Collection Order</h3>
                <div className="flex flex-col gap-2">
                  {route.order.map((stop, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-white"
                        style={{ width: 26, height: 26, fontSize: 11, background: stop.type === "depot" ? "#F57C00" : "#2E7D32" }}
                      >
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
              <button
                onClick={handleSend}
                disabled={sending}
                className="w-full rounded-lg py-2.5 font-semibold text-white mt-auto hover:opacity-90 transition-opacity"
                style={{ fontSize: 14, background: "#2E7D32", opacity: sending ? 0.7 : 1 }}
              >
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
    <div className="rounded-lg p-3 flex flex-col gap-1" style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-text-muted" style={{ fontSize: 11 }}>{label}</span>
      </div>
      <div className="font-semibold text-text-primary" style={{ fontSize: 14 }}>{value}</div>
    </div>
  );
}
