import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, UserCircle } from "lucide-react";
import { NOTIFICATIONS } from "../mock/data";

const ROUTE_LABELS = {
  "/pb/dashboard":     "Dashboard",
  "/pb/map":           "Live Map",
  "/pb/rewards":       "Rewards Management",
  "/pb/leaderboard":   "Leaderboard",
  "/pb/users":         "MRF Personnel",
  "/pb/notifications": "Notifications",
  "/pb/settings":      "Settings",
};

export default function PBTopHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pageLabel = ROUTE_LABELS[pathname] ?? "Dashboard";
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-6"
      style={{
        left: 240,
        height: 60,
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5" style={{ fontSize: 13 }}>
        <span className="text-text-secondary font-medium">BE-SMART</span>
        <span className="text-text-muted">/</span>
        <span className="text-text-primary font-semibold">{pageLabel}</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button
          onClick={() => navigate("/pb/notifications")}
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Bell size={18} className="text-text-secondary" />
          {unread > 0 && (
            <span
              className="absolute top-1 right-1 flex items-center justify-center rounded-full text-white font-bold"
              style={{
                width: 16,
                height: 16,
                fontSize: 9,
                background: "#D32F2F",
              }}
            >
              {unread}
            </span>
          )}
        </button>

        {/* User info */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 32, height: 32, background: "#E8F5E9" }}
          >
            <UserCircle size={20} color="#2E7D32" />
          </div>
          <div>
            <div className="font-semibold text-text-primary leading-tight" style={{ fontSize: 13 }}>
              Hon. Juan dela Cruz
            </div>
            <div className="text-text-muted leading-tight" style={{ fontSize: 11 }}>
              Punong Barangay
            </div>
          </div>
          <ChevronDown size={14} className="text-text-muted ml-1" />
        </div>
      </div>
    </header>
  );
}
