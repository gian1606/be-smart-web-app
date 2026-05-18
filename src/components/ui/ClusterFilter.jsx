/**
 * ClusterFilter — pill row for filtering by cluster
 * Props:
 *   value    — selected cluster id or "all"
 *   onChange — callback(id)
 *   clusters — array of { id, label } (optional, falls back to built-in list)
 *   allLabel — label for the "all" pill (default "All Clusters")
 */

const DEFAULT_CLUSTERS = [
  { id: "c1", label: "Cluster 1 (North Zone)" },
  { id: "c2", label: "Cluster 2" },
  { id: "c3", label: "Cluster 3" },
  { id: "c4", label: "Cluster 4" },
  { id: "c5", label: "Cluster 5" },
];

export default function ClusterFilter({
  value,
  onChange,
  clusters = DEFAULT_CLUSTERS,
  allLabel = "All Clusters",
}) {
  const options = [{ id: "all", label: allLabel }, ...clusters];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="rounded-full px-4 py-1.5 font-medium transition-colors"
            style={{
              fontSize: 13,
              background: active ? "#2E7D32" : "#fff",
              color: active ? "#fff" : "#6B7280",
              border: active ? "1px solid #2E7D32" : "1px solid #E5E7EB",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
