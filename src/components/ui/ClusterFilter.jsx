/**
 * ClusterFilter — pill row for filtering by cluster
 * Props: value (cluster id or "all"), onChange
 */
import { CLUSTERS } from "../../mock/data";

export default function ClusterFilter({ value, onChange }) {
  const options = [{ id: "all", label: "All Clusters" }, ...CLUSTERS];

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
