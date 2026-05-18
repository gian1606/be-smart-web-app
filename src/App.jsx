import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ── Single shared login ────────────────────────────────────────────────────────
import Login from "./pages/Login";

// ── Super Admin ────────────────────────────────────────────────────────────────
import SuperAdminShell   from "./super-admin/layout/AppShell";
import SADashboard       from "./super-admin/pages/Dashboard";
import SAMapCollection   from "./super-admin/pages/MapCollection";
import SARouteManagement from "./super-admin/pages/RouteManagement";
import SAUserManagement  from "./super-admin/pages/UserManagement";
import SAReports         from "./super-admin/pages/Reports";
import SAMRFManagement   from "./super-admin/pages/MRFManagement";
import SANotifications   from "./super-admin/pages/Notifications";

// ── Cluster Admin ──────────────────────────────────────────────────────────────
import ClusterAdminShell    from "./cluster-admin/layout/AppShell";
import CADashboard          from "./cluster-admin/pages/Dashboard";
import CAMapCollection      from "./cluster-admin/pages/MapCollection";
import CABarangayManagement from "./cluster-admin/pages/BarangayManagement";
import CAUserManagement     from "./cluster-admin/pages/UserManagement";
import CAReports            from "./cluster-admin/pages/Reports";
import CANotifications      from "./cluster-admin/pages/Notifications";

// ── Shared ─────────────────────────────────────────────────────────────────────
import ComingSoon from "./components/ui/ComingSoon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Login (shared, role determined by credentials) ────────────────── */}
        <Route path="/"      element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* ── Super Admin ───────────────────────────────────────────────────── */}
        <Route path="/super-admin" element={<SuperAdminShell />}>
          <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
          <Route path="dashboard"     element={<SADashboard />} />
          <Route path="map"           element={<SAMapCollection />} />
          <Route path="routes"        element={<SARouteManagement />} />
          <Route path="users"         element={<SAUserManagement />} />
          <Route path="reports"       element={<SAReports />} />
          <Route path="mrf"           element={<SAMRFManagement />} />
          <Route path="notifications" element={<SANotifications />} />
          <Route
            path="settings"
            element={
              <div className="flex flex-col gap-6">
                <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>Settings</h1>
                <div className="bg-white rounded-xl" style={{ border: "1px solid #E5E7EB" }}>
                  <ComingSoon title="Settings" description="System configuration and preferences are coming in a future update." />
                </div>
              </div>
            }
          />
        </Route>

        {/* ── Cluster Admin ─────────────────────────────────────────────────── */}
        <Route path="/cluster-admin" element={<ClusterAdminShell />}>
          <Route index element={<Navigate to="/cluster-admin/dashboard" replace />} />
          <Route path="dashboard"     element={<CADashboard />} />
          <Route path="map"           element={<CAMapCollection />} />
          <Route path="barangays"     element={<CABarangayManagement />} />
          <Route path="users"         element={<CAUserManagement />} />
          <Route path="reports"       element={<CAReports />} />
          <Route path="notifications" element={<CANotifications />} />
          <Route
            path="settings"
            element={
              <div className="flex flex-col gap-6">
                <h1 className="font-bold text-text-primary" style={{ fontSize: 28 }}>Settings</h1>
                <div className="bg-white rounded-xl" style={{ border: "1px solid #E5E7EB" }}>
                  <ComingSoon title="Settings" description="System configuration and preferences are coming in a future update." />
                </div>
              </div>
            }
          />
        </Route>

        {/* ── Catch-all ─────────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
