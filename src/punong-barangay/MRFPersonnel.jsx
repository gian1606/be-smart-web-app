import { useState } from "react";
import { Plus, Pencil, UserX, Info } from "lucide-react";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import { MRF_PERSONNEL, MRF_LOCATIONS } from "../mock/data";

const EMPTY_FORM = {
  name: "",
  email: "",
  mrf: "",
  tempPassword: "",
};

export default function MRFPersonnel() {
  const [users, setUsers] = useState(MRF_PERSONNEL);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
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
      mrf: user.mrf,
      tempPassword: "",
    });
    setFormErrors({});
    setModalOpen(true);
  }

  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.mrf) e.mrf = "Assign an MRF facility.";
    if (!editUser && !form.tempPassword)
      e.tempPassword = "Temporary password is required.";
    return e;
  }

  function handleSave() {
    const e = validateForm();
    if (Object.keys(e).length) { setFormErrors(e); return; }

    if (editUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editUser.id
            ? { ...u, name: form.name, email: form.email, mrf: form.mrf }
            : u
        )
      );
    } else {
      const newUser = {
        id: `mp${Date.now()}`,
        name: form.name,
        email: form.email,
        mrf: form.mrf,
        role: "mrf_personnel",
        status: "active",
        lastLogin: null,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setModalOpen(false);
  }

  function handleToggleStatus(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  }

  function formatLastLogin(ts) {
    if (!ts) return "Never";
    return new Date(ts).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>
            MRF Personnel
          </h1>
          <p className="text-text-secondary mt-0.5" style={{ fontSize: 14 }}>
            Manage accounts for Material Recovery Facility staff.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ fontSize: 14, background: "#2E7D32" }}
        >
          <Plus size={15} />
          Add MRF Account
        </button>
      </div>

      {/* Privacy notice */}
      <div
        className="flex items-start gap-3 rounded-xl px-4 py-3"
        style={{ background: "#E3F2FD", border: "1px solid #90CAF9" }}
      >
        <Info size={16} color="#1976D2" className="flex-shrink-0 mt-0.5" />
        <p style={{ fontSize: 13, color: "#1565C0" }}>
          Only MRF personnel accounts are managed here. Resident data is private and
          restricted from this view.
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
              {["Name", "Role", "Assigned MRF", "Email", "Status", "Last Login", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left font-semibold uppercase tracking-wide px-4 py-3"
                    style={{ fontSize: 12, color: "#6B7280" }}
                  >
                    {h}
                  </th>
                )
              )}
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
                  MRF Personnel
                </td>
                <td className="px-4 py-3 text-text-primary" style={{ fontSize: 13 }}>
                  {u.mrf}
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
                      onClick={() => handleToggleStatus(u.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title={u.status === "active" ? "Deactivate" : "Activate"}
                    >
                      <UserX
                        size={15}
                        color={u.status === "active" ? "#D32F2F" : "#2E7D32"}
                      />
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
        title={editUser ? "Edit MRF Account" : "Add MRF Account"}
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
            placeholder="e.g. Roberto Navarro"
          />
          <FormField
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            error={formErrors.email}
            placeholder="roberto.navarro@besmart.gov.ph"
          />
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>
              Assigned MRF Facility
            </label>
            <select
              value={form.mrf}
              onChange={(e) => setForm((p) => ({ ...p, mrf: e.target.value }))}
              className="rounded-lg px-3 py-2.5 outline-none"
              style={{
                fontSize: 14,
                border: formErrors.mrf ? "1.5px solid #D32F2F" : "1.5px solid #E5E7EB",
                background: "#F9FAFB",
                color: "#1A1A1A",
              }}
            >
              <option value="">Select an MRF facility…</option>
              {MRF_LOCATIONS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            {formErrors.mrf && (
              <span style={{ fontSize: 12, color: "#D32F2F" }}>{formErrors.mrf}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>
              Role
            </label>
            <input
              value="MRF Personnel"
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
