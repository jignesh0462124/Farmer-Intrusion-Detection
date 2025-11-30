// src/pages/Camera.tsx
import React from "react";
import {
  Camera,
  ChevronDown,
  Grid3X3,
  List as ListIcon,
  Map as MapIcon,
  MoreVertical,
  Search,
  Wifi,
  Star,
  Volume2,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";

type CameraStatus = "online" | "offline";

type CameraInfo = {
  id: string;
  name: string;
  zone: string;
  resolution: string;
  bitrate: string;
  streamLabel: string;
  status: CameraStatus;
  lastSeen?: string;
  favorite?: boolean;
};

const cameras: CameraInfo[] = [
  {
    id: "gate",
    name: "Gate Entrance",
    zone: "North Zone",
    resolution: "720p",
    bitrate: "1.2 Mbps",
    streamLabel: "LIVE",
    status: "online",
    favorite: true,
  },
  {
    id: "barn",
    name: "Barn Interior",
    zone: "Central Zone",
    resolution: "480p",
    bitrate: "0.8 Mbps",
    streamLabel: "LIVE",
    status: "online",
  },
  {
    id: "south-field",
    name: "South Field",
    zone: "South Zone",
    resolution: "1080p",
    bitrate: "2.1 Mbps",
    streamLabel: "LIVE",
    status: "online",
    favorite: true,
  },
  {
    id: "storage",
    name: "Equipment Storage",
    zone: "West Zone",
    resolution: "",
    bitrate: "",
    streamLabel: "IMG",
    status: "offline",
    lastSeen: "Last seen 12m ago",
  },
];

const CameraPage: React.FC = () => {
  const onlineCount = cameras.filter((c) => c.status === "online").length;
  const offlineCount = cameras.filter((c) => c.status === "offline").length;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      {/* Top header */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
            Camera Feeds
          </h1>
          <div className="hidden items-center gap-2 text-[11px] md:flex">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {onlineCount} Online
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 font-medium text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {offlineCount} Offline
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <button className="hidden rounded-full border border-slate-200 bg-white p-2 hover:bg-slate-50 md:inline-flex">
            <Search className="h-4 w-4" />
          </button>
          <button className="rounded-full border border-slate-200 bg-white p-2 hover:bg-slate-50">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="space-y-4">
        {/* Farm selector & view toggles */}
        <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-200 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {/* Farm dropdown */}
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
              Sunrise Farm
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>

            {/* View type */}
            <div className="hidden items-center gap-1 text-xs font-medium text-slate-600 md:flex">
              <ViewToggle active icon={<Grid3X3 className="h-3.5 w-3.5" />}>
                Grid
              </ViewToggle>
              <ViewToggle icon={<ListIcon className="h-3.5 w-3.5" />}>
                List
              </ViewToggle>
              <ViewToggle icon={<MapIcon className="h-3.5 w-3.5" />}>
                Map
              </ViewToggle>
            </div>
          </div>

          {/* Layout size toggles */}
          <div className="flex items-center gap-3 text-[11px]">
            <div className="hidden items-center gap-1 md:flex">
              <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                {onlineCount} Online
              </span>
              <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-600">
                {offlineCount} Offline
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
              <LayoutToggle active>2×2</LayoutToggle>
              <LayoutToggle>1×1</LayoutToggle>
              <LayoutToggle>2×3</LayoutToggle>
            </div>
          </div>
        </section>

        {/* Zone chips */}
        <section className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600 shadow-sm shadow-slate-200">
          <ZoneChip active>All Zones</ZoneChip>
          <ZoneChip>North Field</ZoneChip>
          <ZoneChip>Gate</ZoneChip>
          <ZoneChip>Barn</ZoneChip>
          <ZoneChip
            icon={<Star className="h-3 w-3 fill-amber-400 text-amber-500" />}
          >
            Favorites
          </ZoneChip>
        </section>

        {/* Network bar */}
        <section className="flex items-center justify-between rounded-2xl bg-sky-600 px-4 py-2 text-[11px] text-sky-50 shadow-sm shadow-sky-300/40">
          <div className="inline-flex items-center gap-2">
            <Wifi className="h-3.5 w-3.5" />
            <span className="font-medium">Wi-Fi Connected</span>
            <span className="opacity-80">• 4.5 Mbps</span>
          </div>
          <button className="inline-flex items-center gap-1 rounded-full bg-sky-500/40 px-3 py-1 font-medium hover:bg-sky-500/60">
            Auto Quality
          </button>
        </section>

        {/* Camera grid */}
        <section className="grid gap-4 xl:grid-cols-2">
          {cameras.map((cam) => (
            <CameraCard key={cam.id} camera={cam} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default CameraPage;

/* ----------------------- small UI bits ------------------------- */

const ViewToggle: React.FC<{
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
}> = ({ children, icon, active }) => (
  <button
    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${
      active
        ? "bg-emerald-500 text-white shadow-sm"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

const LayoutToggle: React.FC<{
  children: React.ReactNode;
  active?: boolean;
}> = ({ children, active }) => (
  <button
    className={`rounded-full px-3 py-1 ${
      active
        ? "bg-white text-slate-900 shadow-sm"
        : "text-slate-600 hover:bg-slate-200/80"
    }`}
  >
    {children}
  </button>
);

const ZoneChip: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}> = ({ children, active, icon }) => (
  <button
    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${
      active
        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
    }`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

/* ------------------------ Camera card -------------------------- */

type CameraCardProps = {
  camera: CameraInfo;
};

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
  const isOnline = camera.status === "online";

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200 overflow-hidden">
      {/* video area */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-slate-900">
        {isOnline ? (
          <div className="h-full w-full bg-slate-900" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200">
            <div className="flex flex-col items-center gap-2 text-[11px] text-slate-500">
              <RefreshCcw className="h-4 w-4 animate-spin-slow" />
              <span className="font-medium">Offline</span>
              {camera.lastSeen && <span>{camera.lastSeen}</span>}
            </div>
          </div>
        )}

        {/* Overlay header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-3 py-2 text-[10px] font-medium text-white">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-black/40 px-2 py-0.5">
              {camera.streamLabel}{" "}
              {camera.resolution && `• ${camera.resolution}`}
            </span>
            {camera.bitrate && (
              <span className="rounded-full bg-black/30 px-2 py-0.5 opacity-90">
                {camera.bitrate}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-black/40 px-2 py-0.5">
              IMG 696×391.5
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
                isOnline ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* time stamp bottom right */}
        <div className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-black/40 px-2 py-1 text-[10px] text-slate-100">
          14:32:15
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between px-4 py-3 text-xs">
        <div>
          <div className="flex items-center gap-1 text-[13px] font-semibold text-slate-900">
            <Camera className="h-3.5 w-3.5 text-slate-400" />
            <span>{camera.name}</span>
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500">{camera.zone}</div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          {isOnline ? (
            <button className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200">
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200">
              <AlertCircle className="h-3.5 w-3.5 text-red-500" />
            </button>
          )}

          <button
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 ${
              camera.favorite ? "text-amber-400" : "text-slate-400"
            }`}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                camera.favorite ? "fill-amber-400" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Offline footer action */}
      {!isOnline && (
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px]">
          <span className="text-slate-500">
            Connection lost. Check power or network.
          </span>
          <button className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600">
            Retry
          </button>
        </div>
      )}
    </article>
  );
};

export { CameraPage };
