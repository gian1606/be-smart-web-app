import { useState } from "react";
import { Plus, Pencil, UserX } from "lucide-react";
import StatusBadge from "../../components/ui/StatusBadge";
import Modal from "../../components/ui/Modal";
import { BARANGAYS, CLUSTER_INFO } from "../mock/data";

const EMPTY_FORM = {
  name: "",
  captain: "",
  email: "",
  zone: "",
  tempPassword: "",
};

export default function BarangayManagement() {
  const [barangays, setBarangays] = useState(BARANGAYS);
  const [modalOpen, setModalOpen] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});

  function openAdd() {
    setEditItem(null); setForm(EMPTY_FORM); setFormErrors({}); setModalOpen(true);
  }
  function openEdit(item) {
    setEditItem(item);
    setForm({ name: item.name, captain: item.captain, email: item.email, zone: item.zone ?? "", tempPassword: "" });
    setFormErrors({}); setModalOpen(true);
  }

  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = "Barangay name is required.";
    if (!form.captain.trim()) e.captain = "Contact person is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
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
            ? { ...b, name: form.name, captain: form.captain, email: form.email }
            : b
        )
      );
    } else {
      setBarangays((prev) => [
        ...prev,
        {
          id: `br${Date.now()}`,
          name: form.name,
          captain: form.captain,
          email: form.email,
          totalBins: 0,
          activeResidents: 0,
          status: "active",
          lastActivity: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setModalOpen(false);
  }

  function handleDeactivate(id) {
    setBarangays((prev) =>
      prev.map((b) => b.id === id ? { ...b, status: b.status === "active" ? "inactive" : "active" } : b)
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
            Managing barangays under {CLUSTER_INFO.label} — {CLUSTER_INFO.zone}
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

      {/* Table */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {["Barangay Name", "Captain / Contact", "Email", "Total Bins", "Active Residents", "Status", "Last Activity", "Actions"].map((h) => (
                <th key={h} className="text-left font-semibold uppercase tracking-wide px-4 py-3" style={{ fontSize: 12, color: "#6B7280" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {barangays.map((b, i) => (
              <tr key={b.id} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                <td className="px-4 py-3 font-semibold text-text-primary" style={{ fontSize: 13 }}>{b.name}</td>
                <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>{b.captain}</td>
                <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>{b.email}</td>
                <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>{b.totalBins}</td>
                <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>{b.activeResidents}</td>
                <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>{b.lastActivity}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                      <Pencil size={15} color="#6B7280" />
                    </button>
                    <button onClick={() => setDeactivateTarget(b)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title={b.status === "active" ? "Deactivate" : "Activate"}>
                      <UserX size={15} color={b.status === "active" ? "#D32F2F" : "#2E7D32"} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
            <button onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 font-medium" style={{ fontSize: 14, border: "1.5px solid #E5E7EB", color: "#6B7280" }}>
              Cancel
            </button>
            <button onClick={handleSave} className="rounded-lg px-5 py-2 font-semibold text-white hover:opacity-90 transition-opacity" style={{ fontSize: 14, background: "#2E7D32" }}>
              {editItem ? "Save Changes" : "Create Account"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="Barangay Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} error={formErrors.name} placeholder="e.g. Brgy. Kumintang Ibaba" />
          <FormField label="Contact Person" value={form.captain} onChange={(v) => setForm((p) => ({ ...p, captain: v }))} error={formErrors.captain} placeholder="e.g. Jose Reyes" />
          <FormField label="Email Address" type="email" value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} error={formErrors.email} placeholder="barangay@besmart.gov.ph" />
          <FormField label="Assigned Zone / Area" value={form.zone} onChange={(v) => setForm((p) => ({ ...p, zone: v }))} placeholder="e.g. North Zone" />
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>Cluster</label>
            <input value={`${CLUSTER_INFO.label} — ${CLUSTER_INFO.zone}`} disabled className="rounded-lg px-3 py-2.5" style={{ fontSize: 14, border: "1.5px solid #E5E7EB", background: "#F3F4F6", color: "#9CA3AF" }} />
          </div>
          {!editItem && (
            <FormField label="Temporary Password" type="password" value={form.tempPassword} onChange={(v) => setForm((p) => ({ ...p, tempPassword: v }))} error={formErrors.tempPassword} placeholder="Min. 8 characters" />
          )}
        </div>
      </Modal>

      {/* Deactivate Confirmation Modal */}
      <Modal
        open={!!deactivateTarget}
        onClose={() => setDeactivateTarget(null)}
        title="Confirm Deactivation"
        footer={
          <>
            <button onClick={() => setDeactivateTarget(null)} className="rounded-lg px-4 py-2 font-medium" style={{ fontSize: 14, border: "1.5px solid #E5E7EB", color: "#6B7280" }}>
              Cancel
            </button>
            <button
              onClick={() => handleDeactivate(deactivateTarget?.id)}
              className="rounded-lg px-5 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ fontSize: 14, background: deactivateTarget?.status === "active" ? "#D32F2F" : "#2E7D32" }}
            >
              {deactivateTarget?.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center justify-center rounded-full mx-auto"
            style={{ width: 56, height: 56, background: "#FFEBEE" }}
          >
            <UserX size={26} color="#D32F2F" />
          </div>
          <p className="text-center font-semibold text-text-primary" style={{ fontSize: 15 }}>
            Are you sure you want to {deactivateTarget?.status === "active" ? "deactivate" : "activate"}{" "}
            <strong>{deactivateTarget?.name}</strong>?
          </p>
          {deactivateTarget?.status === "active" && (
            <p className="text-center text-text-secondary" style={{ fontSize: 13 }}>
              This will suspend their account access.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}

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
