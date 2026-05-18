import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

export default function AppShell() {
  // Simple auth guard — check sessionStorage flag set on login
  const isAuth = sessionStorage.getItem("bs_auth") === "true";
  if (!isAuth) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen" style={{ background: "#F5F7F5" }}>
      <Sidebar />
      <TopHeader />
      {/* Main content offset: sidebar 240px, header 60px */}
      <main
        className="overflow-y-auto"
        style={{ marginLeft: 240, paddingTop: 60, minHeight: "100vh" }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
