// ─── BE-SMART Super Admin Mock Data ───────────────────────────────────────────
// Mirrors the mobile app's data shapes for seamless future backend integration.
// Status strings, barangay names, and color mappings must stay in sync with mobile.

// ── Barangays (Batangas City) ──────────────────────────────────────────────────
export const BARANGAYS = [
  "Alangilan",
  "Cuta",
  "Kumintang Ibaba",
  "Kumintang Ilaya",
  "Libjo",
  "Pallocan West",
  "Pallocan East",
  "Sta. Rita Karsada",
];

// ── Clusters ──────────────────────────────────────────────────────────────────
export const CLUSTERS = [
  { id: "c1", label: "Cluster 1 (North Zone)" },
  { id: "c2", label: "Cluster 2" },
  { id: "c3", label: "Cluster 3" },
  { id: "c4", label: "Cluster 4" },
  { id: "c5", label: "Cluster 5" },
];

// ── Dashboard Stats ────────────────────────────────────────────────────────────
export const DASHBOARD_STATS = {
  totalBins: 248,
  fullBins: 31,
  collectedToday: 18,
  activeTrucks: 7,
};

// ── Bins ──────────────────────────────────────────────────────────────────────
// status: 'full' | 'ok' | 'collected' | 'missed'
// posX / posY: 0–1 percentage values (same as mobile)
export const BINS = [
  { id: "b1",  name: "Bin A-01", street: "P. Burgos St.",       barangay: "Alangilan",        cluster: "c1", status: "full",      reportedBy: "resident_01", timeReported: "2025-05-18T06:12:00Z", posX: 0.28, posY: 0.22 },
  { id: "b2",  name: "Bin A-02", street: "Rizal Ave.",          barangay: "Alangilan",        cluster: "c1", status: "ok",        reportedBy: null,          timeReported: null,                   posX: 0.32, posY: 0.30 },
  { id: "b3",  name: "Bin B-01", street: "Evangelista St.",     barangay: "Cuta",             cluster: "c1", status: "full",      reportedBy: "resident_02", timeReported: "2025-05-18T07:45:00Z", posX: 0.45, posY: 0.18 },
  { id: "b4",  name: "Bin B-02", street: "Mabini St.",          barangay: "Cuta",             cluster: "c1", status: "collected", reportedBy: "resident_03", timeReported: "2025-05-18T05:30:00Z", posX: 0.50, posY: 0.25 },
  { id: "b5",  name: "Bin C-01", street: "Kumintang Road",      barangay: "Kumintang Ibaba",  cluster: "c2", status: "full",      reportedBy: "resident_04", timeReported: "2025-05-18T08:00:00Z", posX: 0.60, posY: 0.35 },
  { id: "b6",  name: "Bin C-02", street: "Kumintang Road",      barangay: "Kumintang Ibaba",  cluster: "c2", status: "ok",        reportedBy: null,          timeReported: null,                   posX: 0.65, posY: 0.40 },
  { id: "b7",  name: "Bin D-01", street: "Ilaya Rd.",           barangay: "Kumintang Ilaya",  cluster: "c2", status: "missed",    reportedBy: "resident_05", timeReported: "2025-05-17T14:00:00Z", posX: 0.70, posY: 0.28 },
  { id: "b8",  name: "Bin D-02", street: "Ilaya Rd.",           barangay: "Kumintang Ilaya",  cluster: "c2", status: "full",      reportedBy: "resident_06", timeReported: "2025-05-18T09:10:00Z", posX: 0.75, posY: 0.32 },
  { id: "b9",  name: "Bin E-01", street: "Libjo Main St.",      barangay: "Libjo",            cluster: "c3", status: "ok",        reportedBy: null,          timeReported: null,                   posX: 0.38, posY: 0.55 },
  { id: "b10", name: "Bin E-02", street: "Libjo Main St.",      barangay: "Libjo",            cluster: "c3", status: "full",      reportedBy: "resident_07", timeReported: "2025-05-18T07:00:00Z", posX: 0.42, posY: 0.60 },
  { id: "b11", name: "Bin F-01", street: "Pallocan West Ave.",  barangay: "Pallocan West",    cluster: "c3", status: "collected", reportedBy: "resident_08", timeReported: "2025-05-18T06:00:00Z", posX: 0.22, posY: 0.65 },
  { id: "b12", name: "Bin F-02", street: "Pallocan West Ave.",  barangay: "Pallocan West",    cluster: "c3", status: "full",      reportedBy: "resident_09", timeReported: "2025-05-18T08:30:00Z", posX: 0.18, posY: 0.70 },
  { id: "b13", name: "Bin G-01", street: "Pallocan East Rd.",   barangay: "Pallocan East",    cluster: "c4", status: "ok",        reportedBy: null,          timeReported: null,                   posX: 0.55, posY: 0.68 },
  { id: "b14", name: "Bin G-02", street: "Pallocan East Rd.",   barangay: "Pallocan East",    cluster: "c4", status: "full",      reportedBy: "resident_10", timeReported: "2025-05-18T09:45:00Z", posX: 0.58, posY: 0.72 },
  { id: "b15", name: "Bin H-01", street: "Sta. Rita Road",      barangay: "Sta. Rita Karsada",cluster: "c5", status: "missed",    reportedBy: "resident_11", timeReported: "2025-05-17T16:00:00Z", posX: 0.80, posY: 0.60 },
  { id: "b16", name: "Bin H-02", street: "Sta. Rita Road",      barangay: "Sta. Rita Karsada",cluster: "c5", status: "full",      reportedBy: "resident_12", timeReported: "2025-05-18T10:00:00Z", posX: 0.84, posY: 0.65 },
];

// ── Trucks ─────────────────────────────────────────────────────────────────────
// status: 'en_route' | 'idle' | 'at_depot'
export const TRUCKS = [
  { id: "t1", label: "Truck 01", status: "en_route", posX: 0.35, posY: 0.26 },
  { id: "t2", label: "Truck 02", status: "en_route", posX: 0.62, posY: 0.38 },
  { id: "t3", label: "Truck 03", status: "idle",     posX: 0.20, posY: 0.50 },
  { id: "t4", label: "Truck 04", status: "at_depot", posX: 0.10, posY: 0.85 },
  { id: "t5", label: "Truck 05", status: "idle",     posX: 0.50, posY: 0.80 },
  { id: "t6", label: "Truck 06", status: "en_route", posX: 0.78, posY: 0.55 },
  { id: "t7", label: "Truck 07", status: "at_depot", posX: 0.12, posY: 0.88 },
];

// ── MRF Locations ──────────────────────────────────────────────────────────────
// status: 'available' | 'full'
export const MRF_LOCATIONS = [
  { id: "m1", name: "MRF Alangilan",        barangay: "Alangilan",        cluster: "c1", status: "available", posX: 0.30, posY: 0.15 },
  { id: "m2", name: "MRF Cuta",             barangay: "Cuta",             cluster: "c1", status: "full",      posX: 0.48, posY: 0.20 },
  { id: "m3", name: "MRF Kumintang Ibaba",  barangay: "Kumintang Ibaba",  cluster: "c2", status: "available", posX: 0.63, posY: 0.30 },
  { id: "m4", name: "MRF Libjo",            barangay: "Libjo",            cluster: "c3", status: "available", posX: 0.40, posY: 0.58 },
  { id: "m5", name: "MRF Pallocan West",    barangay: "Pallocan West",    cluster: "c3", status: "full",      posX: 0.20, posY: 0.68 },
];

// ── Collection Routes ──────────────────────────────────────────────────────────
// status: 'delivered' | 'in_progress' | 'completed'
export const ROUTES = [
  {
    id: "r1",
    routeId: "RT-2025-001",
    date: "2025-05-18",
    cluster: "c1",
    bins: ["b1", "b3", "b4"],
    distanceKm: 4.2,
    estimatedMinutes: 35,
    sentTo: "Juan dela Cruz",
    status: "completed",
    optimizedAt: "2025-05-18T05:00:00Z",
    sentAt: "2025-05-18T05:05:00Z",
  },
  {
    id: "r2",
    routeId: "RT-2025-002",
    date: "2025-05-18",
    cluster: "c2",
    bins: ["b5", "b7", "b8"],
    distanceKm: 5.8,
    estimatedMinutes: 48,
    sentTo: "Maria Santos",
    status: "in_progress",
    optimizedAt: "2025-05-18T06:00:00Z",
    sentAt: "2025-05-18T06:10:00Z",
  },
  {
    id: "r3",
    routeId: "RT-2025-003",
    date: "2025-05-17",
    cluster: "c3",
    bins: ["b9", "b10", "b11", "b12"],
    distanceKm: 6.1,
    estimatedMinutes: 52,
    sentTo: "Pedro Reyes",
    status: "completed",
    optimizedAt: "2025-05-17T05:30:00Z",
    sentAt: "2025-05-17T05:35:00Z",
  },
  {
    id: "r4",
    routeId: "RT-2025-004",
    date: "2025-05-17",
    cluster: "c4",
    bins: ["b13", "b14"],
    distanceKm: 3.0,
    estimatedMinutes: 25,
    sentTo: "Ana Lim",
    status: "delivered",
    optimizedAt: "2025-05-17T06:00:00Z",
    sentAt: "2025-05-17T06:05:00Z",
  },
  {
    id: "r5",
    routeId: "RT-2025-005",
    date: "2025-05-16",
    cluster: "c5",
    bins: ["b15", "b16"],
    distanceKm: 2.5,
    estimatedMinutes: 20,
    sentTo: "Carlos Mendoza",
    status: "completed",
    optimizedAt: "2025-05-16T05:00:00Z",
    sentAt: "2025-05-16T05:08:00Z",
  },
];

// ── Optimized Route (current session) ─────────────────────────────────────────
export const OPTIMIZED_ROUTE = {
  routeId: "RT-2025-006",
  cluster: "c1",
  bins: ["b1", "b3", "b12"],
  distanceKm: 4.7,
  estimatedMinutes: 38,
  algorithm: "Nearest Neighbor",
  optimizedAt: "2025-05-18T10:30:00Z",
  order: [
    { label: "Truck Depot", type: "depot", posX: 0.10, posY: 0.85 },
    { binId: "b3", label: "Bin B-01", street: "Evangelista St.", posX: 0.45, posY: 0.18 },
    { binId: "b1", label: "Bin A-01", street: "P. Burgos St.",   posX: 0.28, posY: 0.22 },
    { binId: "b12", label: "Bin F-02", street: "Pallocan West Ave.", posX: 0.18, posY: 0.70 },
  ],
};

// ── Cluster Admin Users ────────────────────────────────────────────────────────
// role: 'cluster_admin'
// status: 'active' | 'inactive'
export const CLUSTER_ADMINS = [
  { id: "u1", name: "Juan dela Cruz",   email: "juan.delacruz@besmart.gov.ph",   assignedCluster: "c1", role: "cluster_admin", status: "active",   lastLogin: "2025-05-18T08:00:00Z" },
  { id: "u2", name: "Maria Santos",     email: "maria.santos@besmart.gov.ph",    assignedCluster: "c2", role: "cluster_admin", status: "active",   lastLogin: "2025-05-18T07:30:00Z" },
  { id: "u3", name: "Pedro Reyes",      email: "pedro.reyes@besmart.gov.ph",     assignedCluster: "c3", role: "cluster_admin", status: "active",   lastLogin: "2025-05-17T18:00:00Z" },
  { id: "u4", name: "Ana Lim",          email: "ana.lim@besmart.gov.ph",         assignedCluster: "c4", role: "cluster_admin", status: "inactive", lastLogin: "2025-05-10T09:00:00Z" },
  { id: "u5", name: "Carlos Mendoza",   email: "carlos.mendoza@besmart.gov.ph",  assignedCluster: "c5", role: "cluster_admin", status: "active",   lastLogin: "2025-05-18T06:45:00Z" },
];

// ── Notifications / Announcements ─────────────────────────────────────────────
// type: 'task' | 'schedule' | 'complete' | 'report' | 'announcement'
// priority: 'normal' | 'urgent'
export const NOTIFICATIONS = [
  { id: "n1", type: "announcement", title: "System Maintenance Tonight",       body: "The BE-SMART system will undergo scheduled maintenance from 11 PM to 1 AM. Please complete all route assignments before 10 PM.", target: "all",  priority: "urgent",  sentAt: "2025-05-18T09:00:00Z", read: false },
  { id: "n2", type: "schedule",     title: "Route RT-2025-002 Dispatched",     body: "Collection route for Cluster 2 has been sent to Maria Santos. 3 bins scheduled.", target: "c2",   priority: "normal",  sentAt: "2025-05-18T06:10:00Z", read: true  },
  { id: "n3", type: "complete",     title: "Route RT-2025-001 Completed",      body: "Cluster 1 collection route completed successfully. 3 bins collected.", target: "c1",   priority: "normal",  sentAt: "2025-05-18T08:45:00Z", read: true  },
  { id: "n4", type: "report",       title: "Weekly Collection Report Ready",   body: "The weekly collection summary for May 11–17 is now available in Reports.", target: "all",  priority: "normal",  sentAt: "2025-05-17T17:00:00Z", read: false },
  { id: "n5", type: "task",         title: "Missed Collection — Cluster 5",    body: "Bin H-01 in Sta. Rita Karsada was not collected yesterday. Please reschedule.", target: "c5",   priority: "urgent",  sentAt: "2025-05-17T16:30:00Z", read: false },
  { id: "n6", type: "announcement", title: "New Eco Token Policy Effective",   body: "Updated Eco Token reward rates are now active across all clusters starting today.", target: "all",  priority: "normal",  sentAt: "2025-05-16T08:00:00Z", read: true  },
];

// ── Recent Activity Events ─────────────────────────────────────────────────────
// event: 'bin_reported' | 'collection_confirmed' | 'route_sent' | 'route_completed'
export const RECENT_ACTIVITY = [
  { id: "a1", event: "bin_reported",        description: "Bin H-02 (Sta. Rita Karsada) reported full by resident",    timestamp: "2025-05-18T10:00:00Z" },
  { id: "a2", event: "route_sent",          description: "Route RT-2025-002 sent to Maria Santos (Cluster 2)",        timestamp: "2025-05-18T06:10:00Z" },
  { id: "a3", event: "collection_confirmed",description: "Bin B-02 (Cuta) marked as collected by Truck 01",           timestamp: "2025-05-18T08:20:00Z" },
  { id: "a4", event: "route_completed",     description: "Route RT-2025-001 completed — Cluster 1",                   timestamp: "2025-05-18T08:45:00Z" },
  { id: "a5", event: "bin_reported",        description: "Bin G-02 (Pallocan East) reported full by resident",        timestamp: "2025-05-18T09:45:00Z" },
  { id: "a6", event: "bin_reported",        description: "Bin C-01 (Kumintang Ibaba) reported full by resident",      timestamp: "2025-05-18T08:00:00Z" },
  { id: "a7", event: "collection_confirmed",description: "Bin F-01 (Pallocan West) marked as collected by Truck 03",  timestamp: "2025-05-18T07:15:00Z" },
  { id: "a8", event: "route_sent",          description: "Route RT-2025-001 sent to Juan dela Cruz (Cluster 1)",      timestamp: "2025-05-18T05:05:00Z" },
];

// ── Status Color Map (must match mobile app exactly) ──────────────────────────
export const STATUS_COLORS = {
  full:      "#D32F2F",
  collected: "#2E7D32",
  missed:    "#F57C00",
  ok:        "#2E7D32",
  available: "#2E7D32",
  pending:   "#F57C00",
  completed: "#2E7D32",
  delivered: "#2E7D32",
  in_progress: "#1976D2",
  en_route:  "#1976D2",
  idle:      "#6B7280",
  at_depot:  "#9CA3AF",
};

// ── Mock Credentials ───────────────────────────────────────────────────────────
export const MOCK_CREDENTIALS = {
  email: "superadmin@besmart.gov.ph",
  password: "admin123",
};

// ─── Collector Admin Mock Data ─────────────────────────────────────────────────

// ── Collector Admin credential ─────────────────────────────────────────────────
export const CA_CREDENTIALS = {
  email: "collector.admin@besmart.gov.ph",
  password: "collector123",
  name: "Juan dela Cruz",
  assignedCluster: "c1",
};

// ── Collectors (field workers) ─────────────────────────────────────────────────
// role: 'collector'
// status: 'active' | 'inactive'
export const COLLECTORS = [
  { id: "col1", name: "Ramon Dela Torre",  email: "ramon.delatorre@besmart.gov.ph",  cluster: "c1", role: "collector", status: "active",   lastLogin: "2025-05-18T07:00:00Z", assignedTruck: "ct1" },
  { id: "col2", name: "Efren Magpayo",     email: "efren.magpayo@besmart.gov.ph",    cluster: "c1", role: "collector", status: "active",   lastLogin: "2025-05-18T06:50:00Z", assignedTruck: "ct1" },
  { id: "col3", name: "Dante Villanueva",  email: "dante.villanueva@besmart.gov.ph", cluster: "c1", role: "collector", status: "active",   lastLogin: "2025-05-17T18:00:00Z", assignedTruck: "ct2" },
  { id: "col4", name: "Noel Castillo",     email: "noel.castillo@besmart.gov.ph",    cluster: "c1", role: "collector", status: "inactive", lastLogin: "2025-05-10T08:00:00Z", assignedTruck: null  },
  { id: "col5", name: "Arnel Bautista",    email: "arnel.bautista@besmart.gov.ph",   cluster: "c1", role: "collector", status: "active",   lastLogin: "2025-05-18T07:10:00Z", assignedTruck: "ct3" },
  { id: "col6", name: "Rodel Fernandez",   email: "rodel.fernandez@besmart.gov.ph",  cluster: "c1", role: "collector", status: "active",   lastLogin: "2025-05-18T07:05:00Z", assignedTruck: "ct3" },
];

// ── Collector Units (garbage trucks + assigned collectors) ─────────────────────
// status: 'en_route' | 'idle' | 'at_depot'
export const COLLECTOR_UNITS = [
  {
    id: "ct1",
    name: "Unit Alpha",
    plateNumber: "BTC-1021",
    cluster: "c1",
    status: "en_route",
    collectorIds: ["col1", "col2"],
    posX: 0.35,
    posY: 0.26,
  },
  {
    id: "ct2",
    name: "Unit Bravo",
    plateNumber: "BTC-1034",
    cluster: "c1",
    status: "idle",
    collectorIds: ["col3"],
    posX: 0.20,
    posY: 0.50,
  },
  {
    id: "ct3",
    name: "Unit Charlie",
    plateNumber: "BTC-1047",
    cluster: "c1",
    status: "at_depot",
    collectorIds: ["col5", "col6"],
    posX: 0.10,
    posY: 0.85,
  },
];

// ── Incoming Optimized Route (sent by Super Admin to this Collector Admin) ──────
export const CA_INCOMING_ROUTE = {
  routeId: "RT-2025-006",
  cluster: "c1",
  sentBy: "Super Admin",
  sentAt: "2025-05-18T10:30:00Z",
  bins: ["b1", "b3", "b12"],
  distanceKm: 4.7,
  estimatedMinutes: 38,
  algorithm: "Nearest Neighbor",
  optimizedAt: "2025-05-18T10:30:00Z",
  status: "delivered", // delivered | scheduled | in_progress | completed
  order: [
    { label: "Truck Depot", type: "depot", posX: 0.10, posY: 0.85 },
    { binId: "b3", label: "Bin B-01", street: "Evangelista St.", posX: 0.45, posY: 0.18 },
    { binId: "b1", label: "Bin A-01", street: "P. Burgos St.",   posX: 0.28, posY: 0.22 },
    { binId: "b12", label: "Bin F-02", street: "Pallocan West Ave.", posX: 0.18, posY: 0.70 },
  ],
};

// ── Collector Admin Dashboard Stats ───────────────────────────────────────────
export const CA_DASHBOARD_STATS = {
  totalBins: 16,       // bins in cluster c1
  fullBins: 5,
  collectedToday: 4,
  activeUnits: 3,
};

// ── Collector Admin Recent Activity ───────────────────────────────────────────
export const CA_RECENT_ACTIVITY = [
  { id: "ca1", event: "route_sent",          description: "Optimized route RT-2025-006 received from Super Admin",      timestamp: "2025-05-18T10:30:00Z" },
  { id: "ca2", event: "collection_confirmed",description: "Bin B-02 (Cuta) marked as collected by Unit Alpha",          timestamp: "2025-05-18T08:20:00Z" },
  { id: "ca3", event: "bin_reported",        description: "Bin A-01 (Alangilan) reported full by resident",             timestamp: "2025-05-18T06:12:00Z" },
  { id: "ca4", event: "collection_confirmed",description: "Bin F-01 (Pallocan West) marked as collected by Unit Bravo", timestamp: "2025-05-18T07:15:00Z" },
  { id: "ca5", event: "route_completed",     description: "Route RT-2025-005 completed — all bins collected",           timestamp: "2025-05-17T14:00:00Z" },
  { id: "ca6", event: "bin_reported",        description: "Bin B-01 (Cuta) reported full by resident",                  timestamp: "2025-05-18T07:45:00Z" },
];
