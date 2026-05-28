import { useState, useMemo } from "react";
import { Plus, Pencil, UserX, Search, ChevronDown } from "lucide-react";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import { BARANGAY_ACCOUNTS, CLUSTERS } from "./mock/data";

const EMPTY_FORM = {
  name: "",
  captain: "",
  email: "",
  cluster: "",
  tempPassword: "",
};

function FormField({ label, type = "text", value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg px-3 py-2.5 outline-none"
        style={{ fontSize: 14, border: error ? "1.5px solid #D32F2F" : "1.5px solid #E5E7EB", background: "#F9FAFB" }}
      />
      {error && <span style={{ fontSize: 12, color: "#D32F2F" }}>{error}</span>}
    </div>
  );
}

export default function BarangayManagement() {
  const [barangays, setBarangays] = useState(BARANGAY_ACCOUNTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [filterCluster, setFilterCluster] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return barangays.filter((b) => {
      const matchCluster = filterCluster === "all" || b.cluster === filterCluster;
      const matchStatus  = filterStatus  === "all" || b.status  === filterStatus;
      const matchSearch  = !search.trim() ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.captain.toLowerCase().includes(search.toLowerCase()) ||
        b.email.toLowerCase().includes(search.toLowerCase());
      return matchCluster && matchStatus && matchSearch;
    });
  }, [barangays, filterCluster, filterStatus, search]);

  const activeCount   = barangays.filter((b) => b.status === "active").length;
  const inactiveCount = barangays.filter((b) => b.status === "inactive").length;

  function getClusterLabel(id) {
    return CLUSTERS.find((c) => c.id === id)?.label ?? id;
  }

  // ── Modal helpers ───────────────────────────────────────────────────────────
  function openAdd() {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditItem(item);
    setForm({ name: item.name, captain: item.captain, email: item.email, cluster: item.cluster, tempPassword: "" });
    setFormErrors({});
    setModalOpen(true);
  }

  function validateForm() {
    const e = {};
    if (!form.name.trim())    e.name    = "Barangay name is required.";
    if (!form.captain.trim()) e.captain = "Contact person is required.";
    if (!form.email.trim())   e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.cluster)        e.cluster = "Assign a cluster.";
    if (!editItem && !form.tempPassword) e.tempPassword = "Temporary password is required.";
    return e;
  }

  function handleSave() {
    const e = validateForm();
    if (Object.keys(e).length) { setFormErrors(e); return; }

    if (editItem) {
      setBarangays((prev) =>
        prev.map((b) =>
          b.id === editItem.id
            ? { ...b, name: form.name, captain: form.captain, email: form.email, cluster: form.cluster }
            : b
        )
      );
    } else {
      setBarangays((prev) => [
        ...prev,
        {
          id: `ba${Date.now()}`,
          name: form.name,
          captain: form.captain,
          email: form.email,
          cluster: form.cluster,
          totalBins: 0,
          activeResidents: 0,
          status: "active",
          lastActivity: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setModalOpen(false);
  }

  function handleToggleStatus(id) {
    setBarangays((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === "active" ? "inactive" : "active" } : b
      )
    );
    setDeactivateTarget(null);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>Barangay Management</h1>
          <p className="text-text-secondary mt-0.5" style={{ fontSize: 14 }}>
            City-wide barangay accounts — Batangas City
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ fontSize: 14, background: "#2E7D32" }}
        >
          <Plus size={15} />
          Add Barangay Account
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex items-center gap-3">
        {[
          { label: "Total",    value: barangays.length, bg: "#F3F4F6", color: "#374151" },
          { label: "Active",   value: activeCount,      bg: "#E8F5E9", color: "#2E7D32" },
          { label: "Inactive", value: inactiveCount,    bg: "#FFEBEE", color: "#D32F2F" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: s.bg, border: "1px solid #E5E7EB" }}>
            <span className="font-bold" style={{ fontSize: 18, color: s.color }}>{s.value}</span>
            <span className="font-medium text-text-secondary" style={{ fontSize: 13 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex items-center flex-1" style={{ minWidth: 220 }}>
          <Search size={14} className="absolute left-3 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search barangay, captain, email…"
            className="w-full rounded-lg pl-9 pr-3 py-2 outline-none"
            style={{ fontSize: 13, border: "1.5px solid #E5E7EB", background: "#F9FAFB" }}
          />
        </div>

        {/* Cluster filter */}
        <div className="relative flex items-center">
          <select
            value={filterCluster}
            onChange={(e) => setFilterCluster(e.target.value)}
            className="appearance-none rounded-lg pl-3 pr-8 py-2 outline-none font-medium"
            style={{ fontSize: 13, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", minWidth: 180 }}
          >
            <option value="all">All Clusters</option>
            {CLUSTERS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 pointer-events-none text-text-muted" />
        </div>

        {/* Status filter */}
        <div className="relative flex items-center">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none rounded-lg pl-3 pr-8 py-2 outline-none font-medium"
            style={{ fontSize: 13, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", minWidth: 140 }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 pointer-events-none text-text-muted" />
        </div>

        {(filterCluster !== "all" || filterStatus !== "all" || search) && (
          <button
            onClick={() => { setFilterCluster("all"); setFilterStatus("all"); setSearch(""); }}
            className="rounded-lg px-3 py-2 font-medium hover:bg-red-50 transition-colors"
            style={{ fontSize: 13, border: "1.5px solid #FECACA", color: "#D32F2F", background: "#FFF5F5" }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {["Barangay Name", "Captain / Contact", "Email", "Cluster", "Total Bins", "Active Residents", "Status", "Last Activity", "Actions"].map((h) => (
                <th key={h} className="text-left font-semibold uppercase tracking-wide px-4 py-3"
                  style={{ fontSize: 11, color: "#6B7280" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-text-muted py-10" style={{ fontSize: 14 }}>
                  No barangays match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((b, i) => (
                <tr key={b.id}
                  style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                  <td className="px-4 py-3 font-semibold text-text-primary" style={{ fontSize: 13 }}>{b.name}</td>
                  <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>{b.captain}</td>
                  <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>{b.email}</td>
                  <td className="px-4 py-3" style={{ fontSize: 13 }}>
                    <span className="rounded-full px-2.5 py-0.5 font-medium"
                      style={{ fontSize: 11, background: "#E8F5E9", color: "#2E7D32" }}>
                      {getClusterLabel(b.cluster)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>{b.totalBins}</td>
                  <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>{b.activeResidents}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>{b.lastActivity}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(b)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                        <Pencil size={15} color="#6B7280" />
                      </button>
                      <button onClick={() => setDeactivateTarget(b)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title={b.status === "active" ? "Deactivate" : "Activate"}>
                        <UserX size={15} color={b.status === "active" ? "#D32F2F" : "#2E7D32"} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Barangay Account" : "Add Barangay Account"}
        footer={
          <>
            <button onClick={() => setModalOpen(false)}
              className="rounded-lg px-4 py-2 font-medium"
              style={{ fontSize: 14, border: "1.5px solid #E5E7EB", color: "#6B7280" }}>
              Cancel
            </button>
            <button onClick={handleSave}
              className="rounded-lg px-5 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ fontSize: 14, background: "#2E7D32" }}>
              {editItem ? "Save Changes" : "Create Account"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="Barangay Name" value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            error={formErrors.name} placeholder="e.g. Brgy. Kumintang Ibaba" />
          <FormField label="Contact Person / Captain" value={form.captain}
            onChange={(v) => setForm((p) => ({ ...p, captain: v }))}
            error={formErrors.captain} placeholder="e.g. Jose Reyes" />
          <FormField label="Email Address" type="email" value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            error={formErrors.email} placeholder="barangay@besmart.gov.ph" />

          {/* Cluster selector */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>Assigned Cluster</label>
            <select
              value={form.cluster}
              onChange={(e) => setForm((p) => ({ ...p, cluster: e.target.value }))}
              className="rounded-lg px-3 py-2.5 outline-none"
              style={{ fontSize: 14, border: formErrors.cluster ? "1.5px solid #D32F2F" : "1.5px solid #E5E7EB", background: "#F9FAFB", color: "#1A1A1A" }}
            >
              <option value="">Select a cluster…</option>
              {CLUSTERS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            {formErrors.cluster && <span style={{ fontSize: 12, color: "#D32F2F" }}>{formErrors.cluster}</span>}
          </div>

          {!editItem && (
            <FormField label="Temporary Password" type="password" value={form.tempPassword}
              onChange={(v) => setForm((p) => ({ ...p, tempPassword: v }))}
              error={formErrors.tempPassword} placeholder="Min. 8 characters" />
          )}
        </div>
      </Modal>

      {/* Deactivate / Activate Confirmation Modal */}
      <Modal
        open={!!deactivateTarget}
        onClose={() => setDeactivateTarget(null)}
        title={deactivateTarget?.status === "active" ? "Deactivate Barangay" : "Activate Barangay"}
        footer={
          <>
            <button onClick={() => setDeactivateTarget(null)}
              className="rounded-lg px-4 py-2 font-medium"
              style={{ fontSize: 14, border: "1.5px solid #E5E7EB", color: "#6B7280" }}>
              Cancel
            </button>
            <button
              onClick={() => handleToggleStatus(deactivateTarget?.id)}
              className="rounded-lg px-5 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ fontSize: 14, background: deactivateTarget?.status === "active" ? "#D32F2F" : "#2E7D32" }}
            >
              {deactivateTarget?.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center rounded-full mx-auto"
            style={{ width: 56, height: 56, background: deactivateTarget?.status === "active" ? "#FFEBEE" : "#E8F5E9" }}>
            <UserX size={26} color={deactivateTarget?.status === "active" ? "#D32F2F" : "#2E7D32"} />
          </div>
          <p className="text-center font-semibold text-text-primary" style={{ fontSize: 15 }}>
            {deactivateTarget?.status === "active" ? "Deactivate" : "Activate"}{" "}
            <strong>{deactivateTarget?.name}</strong>?
          </p>
          <p className="text-center text-text-secondary" style={{ fontSize: 13 }}>
            {deactivateTarget?.status === "active"
              ? "This will suspend the barangay account and restrict access."
              : "This will restore the barangay account and re-enable access."}
          </p>
        </div>
      </Modal>
    </div>
  );
}
