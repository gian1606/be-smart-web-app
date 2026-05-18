import { useState } from "react";
import { Plus, Pencil, UserX, Info } from "lucide-react";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import { CLUSTER_ADMINS, CLUSTERS } from "../mock/data";

const EMPTY_FORM = {
  name: "",
  email: "",
  assignedCluster: "",
  tempPassword: "",
};

export default function UserManagement() {
  const [users, setUsers] = useState(CLUSTER_ADMINS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null); // null = add mode
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});

  function openAdd() {
    setEditUser(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalOpen(true);
  }

  function openEdit(user) {
    setEditUser(user);
    setForm({
      name: user.name,
      email: user.email,
      assignedCluster: user.assignedCluster,
      tempPassword: "",
    });
    setFormErrors({});
    setModalOpen(true);
  }

  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.assignedCluster) e.assignedCluster = "Assign a cluster.";
    if (!editUser && !form.tempPassword) e.tempPassword = "Temporary password is required.";
    return e;
  }

  function handleSave() {
    const e = validateForm();
    if (Object.keys(e).length) { setFormErrors(e); return; }

    if (editUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editUser.id
            ? { ...u, name: form.name, email: form.email, assignedCluster: form.assignedCluster }
            : u
        )
      );
    } else {
      const newUser = {
        id: `u${Date.now()}`,
        name: form.name,
        email: form.email,
        assignedCluster: form.assignedCluster,
        role: "cluster_admin",
        status: "active",
        lastLogin: null,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setModalOpen(false);
  }

  function handleDeactivate(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );
  }

  function getClusterLabel(id) {
    return CLUSTERS.find((c) => c.id === id)?.label ?? id;
  }

  function formatLastLogin(ts) {
    if (!ts) return "Never";
    return new Date(ts).toLocaleDateString("en-PH", {
      month: "short", day: "numeric", year: "numeric",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>
          User Management
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ fontSize: 14, background: "#2E7D32" }}
        >
          <Plus size={15} />
          Add Cluster Account
        </button>
      </div>

      {/* Privacy notice */}
      <div
        className="flex items-start gap-3 rounded-xl px-4 py-3"
        style={{ background: "#E3F2FD", border: "1px solid #90CAF9" }}
      >
        <Info size={16} color="#1976D2" className="flex-shrink-0 mt-0.5" />
        <p style={{ fontSize: 13, color: "#1565C0" }}>
          Resident buyer information is private and restricted from Super Admin view. Only Cluster
          Admin accounts are managed here.
        </p>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {["Name", "Role", "Assigned Cluster", "Email", "Status", "Last Login", "Actions"].map((h) => (
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
            {users.map((u, i) => (
              <tr
                key={u.id}
                style={{
                  background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <td className="px-4 py-3 font-semibold text-text-primary" style={{ fontSize: 13 }}>
                  {u.name}
                </td>
                <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>
                  Cluster Admin
                </td>
                <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>
                  {getClusterLabel(u.assignedCluster)}
                </td>
                <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>
                  {u.email}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3 text-text-secondary" style={{ fontSize: 13 }}>
                  {formatLastLogin(u.lastLogin)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} color="#6B7280" />
                    </button>
                    <button
                      onClick={() => handleDeactivate(u.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title={u.status === "active" ? "Deactivate" : "Activate"}
                    >
                      <UserX size={15} color={u.status === "active" ? "#D32F2F" : "#2E7D32"} />
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
        title={editUser ? "Edit Cluster Account" : "Add Cluster Account"}
        footer={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-lg px-4 py-2 font-medium transition-colors"
              style={{ fontSize: 14, border: "1.5px solid #E5E7EB", color: "#6B7280" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg px-5 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ fontSize: 14, background: "#2E7D32" }}
            >
              {editUser ? "Save Changes" : "Create Account"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField
            label="Full Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            error={formErrors.name}
            placeholder="e.g. Juan dela Cruz"
          />
          <FormField
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            error={formErrors.email}
            placeholder="juan.delacruz@besmart.gov.ph"
          />
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>
              Assigned Cluster
            </label>
            <select
              value={form.assignedCluster}
              onChange={(e) => setForm((p) => ({ ...p, assignedCluster: e.target.value }))}
              className="rounded-lg px-3 py-2.5 outline-none"
              style={{
                fontSize: 14,
                border: formErrors.assignedCluster ? "1.5px solid #D32F2F" : "1.5px solid #E5E7EB",
                background: "#F9FAFB",
                color: "#1A1A1A",
              }}
            >
              <option value="">Select a cluster…</option>
              {CLUSTERS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            {formErrors.assignedCluster && (
              <span style={{ fontSize: 12, color: "#D32F2F" }}>{formErrors.assignedCluster}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>
              Role
            </label>
            <input
              value="Cluster Admin"
              disabled
              className="rounded-lg px-3 py-2.5"
              style={{
                fontSize: 14,
                border: "1.5px solid #E5E7EB",
                background: "#F3F4F6",
                color: "#9CA3AF",
              }}
            />
          </div>
          {!editUser && (
            <FormField
              label="Temporary Password"
              type="password"
              value={form.tempPassword}
              onChange={(v) => setForm((p) => ({ ...p, tempPassword: v }))}
              error={formErrors.tempPassword}
              placeholder="Min. 8 characters"
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

function FormField({ label, type = "text", value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg px-3 py-2.5 outline-none"
        style={{
          fontSize: 14,
          border: error ? "1.5px solid #D32F2F" : "1.5px solid #E5E7EB",
          background: "#F9FAFB",
        }}
      />
      {error && <span style={{ fontSize: 12, color: "#D32F2F" }}>{error}</span>}
    </div>
  );
}
