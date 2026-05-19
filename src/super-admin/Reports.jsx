import ComingSoon from "../components/ui/ComingSoon";

export default function Reports() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>
          Reports &amp; Analytics
        </h1>
        <span
          className="rounded-full px-3 py-1 font-semibold"
          style={{ fontSize: 12, background: "#F3F4F6", color: "#9CA3AF" }}
        >
          Coming Soon
        </span>
      </div>
      <div
        className="bg-white rounded-xl"
        style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <ComingSoon
          title="Reports &amp; Analytics"
          description="Date range filters, collection bar charts, full bin trend lines, and per-cluster pie charts are coming in the next release."
        />
      </div>
    </div>
  );
}
