import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AppShell from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import MapCollection from "./pages/MapCollection";
import RouteManagement from "./pages/RouteManagement";
import UserManagement from "./pages/UserManagement";
import Reports from "./pages/Reports";
import MRFManagement from "./pages/MRFManagement";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="map" element={<MapCollection />} />
          <Route path="routes" element={<RouteManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="mrf" element={<MRFManagement />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}