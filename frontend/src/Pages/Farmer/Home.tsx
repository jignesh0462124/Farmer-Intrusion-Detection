// src/pages/Home.tsx
import React from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Battery,
  Bell,
  Camera,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Info,
  Map as MapIcon,
  Phone,
  RadioTower,
  Settings,
  ShieldCheck,
  Siren,
  Wifi,
  Zap,
  CheckCircle2,
} from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white">
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">
              KhetGuard
            </div>
            <div className="text-xs text-slate-500">Farm Security System</div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 px-3 py-4 text-xs font-medium">
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarItem
            icon={<Bell className="h-4 w-4" />}
            active
            badge={
              <span className="ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold text-white">
                3
              </span>
            }
          >
            Alerts
          </SidebarItem>
          <SidebarItem icon={<Camera className="h-4 w-4" />}>
            Cameras
          </SidebarItem>
          <SidebarItem icon={<RadioTower className="h-4 w-4" />}>
            Sensors
          </SidebarItem>
          <SidebarItem icon={<MapIcon className="h-4 w-4" />}>
            Geofence
          </SidebarItem>
          <SidebarItem icon={<Zap className="h-4 w-4" />}>
            Automation
          </SidebarItem>
          <SidebarItem icon={<Activity className="h-4 w-4" />}>
            Reports
          </SidebarItem>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarItem icon={<HelpCircle className="h-4 w-4" />}>
              Support
            </SidebarItem>
            <SidebarItem icon={<Settings className="h-4 w-4" />}>
              Settings
            </SidebarItem>
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-slate-200 px-4 py-3">
          <button className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 hover:bg-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-600">
                IMG
              </div>
              <div className="leading-tight text-left">
                <div className="text-[13px] font-medium text-slate-900">
                  Rajesh Kumar
                </div>
                <div className="text-[11px] text-slate-500">Farm Owner</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
              Farm Dashboard
            </h1>
            <p className="text-xs text-slate-500 md:text-sm">
              Monitor your farm security in real-time
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <StatusPill color="emerald">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              System Armed
            </StatusPill>
            <StatusPill>
              <Wifi className="h-3.5 w-3.5 text-slate-500" />
              Wi-Fi
            </StatusPill>
            <StatusPill>
              <Battery className="h-3.5 w-3.5 text-slate-500" />
              87%
            </StatusPill>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 space-y-6 bg-slate-100 px-4 py-6 md:px-8">
          {/* Metrics */}
          <section className="grid gap-3 md:grid-cols-4">
            <StatusCard
              label="System Status"
              value="Armed"
              accentClass="text-emerald-600"
            />
            <StatusCard
              label="Active Alerts"
              value="3"
              accentClass="text-orange-500"
            />
            <StatusCard
              label="Devices Online"
              value="12/14"
              accentClass="text-emerald-600"
            />
            <StatusCard
              label="Last Motion"
              value="2m ago"
              accentClass="text-slate-900"
            />
          </section>

          {/* Map + quick actions */}
          <section className="grid gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
            {/* Map card */}
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm shadow-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <div className="text-sm font-semibold text-slate-900">
                  Farm Map &amp; Geofence
                </div>
                <button className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100">
                  Edit Geofence
                </button>
              </div>
              <div className="px-5 py-4">
                <div className="relative flex h-56 w-full items-center justify-center rounded-2xl bg-emerald-50">
                  <div className="relative h-44 w-full max-w-xl rounded-2xl border border-emerald-200 bg-emerald-100">
                    <div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-red-400 shadow" />
                    <div className="absolute right-4 bottom-4 h-3 w-3 rounded-full bg-emerald-500 shadow" />
                    <div className="absolute left-6 bottom-6 h-3 w-3 rounded-full bg-orange-400 shadow" />
                    <div className="absolute inset-5 rounded-xl border-2 border-dashed border-emerald-400" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-emerald-900/70">
                      Field-01
                    </div>

                    <div className="absolute right-8 bottom-8 max-w-[170px] rounded-xl border border-slate-100 bg-white px-3 py-2 text-[11px] shadow-lg shadow-emerald-100">
                      <div className="font-medium text-slate-800">
                        Last motion: North Gate
                      </div>
                      <div className="text-slate-500">2 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-3xl border border-slate-100 bg-white shadow-sm shadow-slate-200">
              <div className="border-b border-slate-100 px-5 py-3">
                <div className="text-sm font-semibold text-slate-900">
                  Quick Actions
                </div>
              </div>
              <div className="space-y-2 px-5 py-4">
                <QuickAction
                  color="bg-orange-500"
                  label="Trigger Siren"
                  icon={<Siren className="h-4 w-4" />}
                />
                <QuickAction
                  color="bg-emerald-500"
                  label="Call Neighbor"
                  icon={<Phone className="h-4 w-4" />}
                />
                <QuickAction
                  color="bg-amber-400"
                  label="Turn On Lights"
                  icon={<Zap className="h-4 w-4" />}
                />
                <QuickAction
                  color="bg-red-500"
                  label="Emergency SOS"
                  icon={<AlertTriangle className="h-4 w-4" />}
                />
              </div>
            </div>
          </section>

          {/* Recent alerts */}
          <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm shadow-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div className="text-sm font-semibold text-slate-900">
                Recent Alerts
              </div>
              <button className="text-xs font-medium text-emerald-700 hover:underline">
                View All
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              <AlertRow
                badgeLabel="Human"
                badgeColor="bg-orange-500"
                confidence="94% Confidence"
                title="Movement detected near North Gate"
                time="Today at 07:14 AM"
              />
              <AlertRow
                badgeLabel="Animal"
                badgeColor="bg-emerald-500"
                confidence="87% Confidence"
                title="Wild boar detected in crop area"
                time="Yesterday at 11:32 PM"
              />
              <AlertRow
                badgeLabel="Vehicle"
                badgeColor="bg-sky-500"
                confidence="91% Confidence"
                title="Unknown vehicle at main entrance"
                time="Yesterday at 06:45 PM"
              />
            </div>
          </section>

          {/* Bottom stats */}
          <section className="grid gap-4 md:grid-cols-3">
            <DeviceStatCard
              title="Camera Devices"
              status="4/4 Online"
              statusColor="text-emerald-600"
              items={[
                { label: "North Gate Camera", value: "98%" },
                { label: "South Perimeter", value: "92%" },
                { label: "Crop Field Center", value: "89%" },
                { label: "Storage Area", value: "95%" },
              ]}
            />
            <DeviceStatCard
              title="Motion Sensors"
              status="6/6 Active"
              statusColor="text-emerald-600"
              items={[
                { label: "PIR Sensor 01", value: "100%" },
                { label: "PIR Sensor 02", value: "87%" },
                { label: "Ultrasonic 01", value: "93%" },
                { label: "Beam Break 01", value: "91%" },
              ]}
            />
            <GatewayCard />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

/* ----------------------- Sidebar helpers ------------------------ */

const SidebarGroupLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
    {children}
  </div>
);

type SidebarItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  children,
  active,
  badge,
}) => {
  const base =
    "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors";
  const activeStyles =
    "bg-emerald-500 text-white shadow-sm aria-[current=true]:bg-emerald-500";
  const idleStyles = "text-slate-700 hover:bg-slate-50";

  return (
    <button
      className={`${base} ${active ? activeStyles : idleStyles}`}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
          active
            ? "bg-emerald-600/80 text-white"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1 truncate text-xs">{children}</span>
      {badge}
    </button>
  );
};

/* ------------------------ Top metrics --------------------------- */

type StatusCardProps = {
  label: string;
  value: string;
  accentClass?: string;
};

const StatusCard: React.FC<StatusCardProps> = ({
  label,
  value,
  accentClass,
}) => (
  <div className="rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-sm shadow-slate-200">
    <div className="text-[11px] uppercase tracking-wide text-slate-500">
      {label}
    </div>
    <div
      className={`mt-2 text-lg font-semibold tracking-tight ${
        accentClass ?? "text-slate-900"
      }`}
    >
      {value}
    </div>
  </div>
);

const StatusPill: React.FC<{
  children: React.ReactNode;
  color?: "emerald" | "neutral";
}> = ({ children, color = "neutral" }) => {
  const base = "inline-flex items-center gap-1 rounded-full px-3 py-1";
  const variant =
    color === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-50 text-slate-600";
  return <span className={`${base} ${variant} text-[11px]`}>{children}</span>;
};

/* ------------------------- Quick actions ------------------------ */

type QuickActionProps = {
  label: string;
  color: string;
  icon: React.ReactNode;
};

const QuickAction: React.FC<QuickActionProps> = ({ label, color, icon }) => (
  <button
    className={`flex w-full items-center justify-between rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 ${color}`}
  >
    <span className="flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10">
        {icon}
      </span>
      {label}
    </span>
    <ChevronRight className="h-3.5 w-3.5 opacity-80" />
  </button>
);

/* -------------------------- Alerts list ------------------------- */

type AlertRowProps = {
  badgeLabel: string;
  badgeColor: string;
  confidence: string;
  title: string;
  time: string;
};

const AlertRow: React.FC<AlertRowProps> = ({
  badgeLabel,
  badgeColor,
  confidence,
  title,
  time,
}) => (
  <div className="flex items-center justify-between px-5 py-3 text-xs">
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-[10px] text-slate-500">
        IMG
      </div>
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-white ${badgeColor}`}
          >
            {badgeLabel}
          </span>
          <span className="text-[11px] text-emerald-600">{confidence}</span>
        </div>
        <div className="text-[13px] font-medium text-slate-900">{title}</div>
        <div className="mt-0.5 text-[11px] text-slate-500">{time}</div>
      </div>
    </div>
    <button className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:underline">
      <MapIcon className="h-3.5 w-3.5" />
      View Location
    </button>
  </div>
);

/* --------------------- Devices / sensors cards ------------------ */

type DeviceItem = { label: string; value: string };

type DeviceStatCardProps = {
  title: string;
  status: string;
  statusColor?: string;
  items: DeviceItem[];
};

const DeviceStatCard: React.FC<DeviceStatCardProps> = ({
  title,
  status,
  statusColor = "text-slate-600",
  items,
}) => (
  <div className="rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-sm shadow-slate-200">
    <div className="mb-3 flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className={`mt-0.5 text-[11px] font-medium ${statusColor}`}>
          {status}
        </div>
      </div>
    </div>
    <ul className="space-y-1 text-xs">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center justify-between text-slate-600"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {item.label}
          </div>
          <span className="font-medium text-slate-800">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

/* ------------------------- Gateway card ------------------------- */

const GatewayCard: React.FC = () => (
  <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-sm shadow-slate-200">
    <div className="mb-3 flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-900">
          Gateway Status
        </div>
        <div className="mt-0.5 text-[11px] text-slate-500">Online</div>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Healthy
      </span>
    </div>

    <div className="space-y-2 text-xs">
      <GatewayRow label="Wi-Fi Signal" value="Excellent" percent={62} />
      <GatewayRow label="4G Backup" value="Strong" percent={29} />
      <GatewayRow label="GSM Fallback" value="Available" percent={9} />
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Battery className="h-3.5 w-3.5 text-slate-500" />
          Battery Backup
        </div>
        <span className="text-[11px] font-medium text-slate-700">87%</span>
      </div>
    </div>

    <div className="mt-3 flex items-start gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
      <Info className="mt-0.5 h-3.5 w-3.5 text-sky-500" />
      <span>
        Gateway operating normally. Cellular backup stands by if Wi-Fi drops.
      </span>
    </div>
  </div>
);

type GatewayRowProps = {
  label: string;
  value: string;
  percent: number;
};

const GatewayRow: React.FC<GatewayRowProps> = ({ label, value, percent }) => (
  <div>
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-emerald-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);
