// src/pages/Report.tsx
import React from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Download,
  FileText,
  Info,
  MapPin,
  MoreVertical,
  RadioTower,
  Share2,
  SignalHigh,
  Wifi,
} from "lucide-react";

const Report: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      {/* Header */}
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
            Farm Reports
          </h1>
          <p className="text-xs text-slate-500 md:text-sm">
            Security Analytics
          </p>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <button className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 md:inline-flex">
            Export
          </button>
          <button className="rounded-full border border-slate-200 bg-white p-2 hover:bg-slate-50">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="rounded-full border border-slate-200 bg-white p-2 hover:bg-slate-50">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Filters */}
      <section className="mb-5 flex flex-wrap items-center gap-2 text-xs">
        <FilterPill active>7 days</FilterPill>
        <FilterPill>30 days</FilterPill>
        <FilterPill>All zones</FilterPill>
        <FilterPill icon>More</FilterPill>
      </section>

      <main className="space-y-5">
        {/* Top KPI cards */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total Alerts" value="128" change="+12%" positive />
          <KpiCard
            label="False Positive"
            value="12%"
            change="-3%"
            positive={false}
          />
          <KpiCard label="Avg Response" value="24s" change="+8%" positive />
          <KpiCard label="Device Health" value="97%" change="Uptime" neutral />
        </section>

        {/* Alert Timeline */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <div className="text-sm font-semibold text-slate-900">
              Alert Timeline
            </div>
            <button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100">
              Expand
            </button>
          </div>
          <div className="h-40 w-full bg-slate-50 px-5 py-6 text-center text-[11px] text-slate-400">
            IMG 1327×192 – timeline chart placeholder
          </div>
        </section>

        {/* Alert Types + High Risk Zones */}
        <section className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          {/* Alert types */}
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-200">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Alert Types
            </h2>
            <div className="space-y-2 text-xs">
              <AlertTypeRow
                color="bg-emerald-500"
                label="Human"
                count={38}
                percent="30%"
              />
              <AlertTypeRow
                color="bg-amber-500"
                label="Animal"
                count={79}
                percent="62%"
              />
              <AlertTypeRow
                color="bg-sky-500"
                label="Vehicle"
                count={11}
                percent="8%"
              />
            </div>
          </div>

          {/* High risk zones */}
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-200">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                High-Risk Zones
              </h2>
              <span className="text-[11px] font-medium text-slate-500">
                41 High • 22 Medium • 8 Low
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <ZoneRow
                title="North Gate"
                subtitle="Most frequent entries"
                level="High"
                levelColor="text-red-500"
              />
              <ZoneRow
                title="Barn Area"
                subtitle="Night activity"
                level="Medium"
                levelColor="text-amber-500"
              />
              <ZoneRow
                title="South Field"
                subtitle="Minimal alerts"
                level="Low"
                levelColor="text-emerald-600"
              />
            </div>
          </div>
        </section>

        {/* Insight banners */}
        <section className="space-y-3">
          <InsightBanner
            tone="info"
            title="Unusual Activity Detected"
            description="Spike on Tuesday 18:00–20:00 near North Gate. Consider additional lighting."
          />
          <InsightBanner
            tone="warning"
            title="False Positives Rising"
            description="Barn camera showing 18% false positive rate. Check camera positioning."
          />
        </section>

        {/* Network status */}
        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-200">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">
            Network Status
          </h2>
          <div className="grid gap-4 md:grid-cols-3 text-xs">
            <NetworkRow
              label="Wi-Fi"
              value="62%"
              icon={<Wifi className="h-4 w-4 text-sky-500" />}
            />
            <NetworkRow
              label="4G"
              value="29%"
              icon={<RadioTower className="h-4 w-4 text-emerald-500" />}
            />
            <NetworkRow
              label="GSM"
              value="9%"
              icon={<SignalHigh className="h-4 w-4 text-amber-500" />}
            />
          </div>
        </section>

        {/* Footer actions */}
        <section className="grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.3fr)]">
          <FooterButton icon={<Download className="h-4 w-4" />}>
            CSV
          </FooterButton>
          <FooterButton icon={<FileText className="h-4 w-4" />}>
            PDF
          </FooterButton>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </section>
      </main>
    </div>
  );
};

export default Report;

/* ------------------- small components ------------------- */

const FilterPill: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  icon?: boolean;
}> = ({ children, active, icon }) => (
  <button
    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium ${
      active
        ? "border-slate-900 bg-slate-900 text-white"
        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    }`}
  >
    {icon && <span className="text-slate-400">▼</span>}
    {children}
  </button>
);

type KpiProps = {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  neutral?: boolean;
};

const KpiCard: React.FC<KpiProps> = ({
  label,
  value,
  change,
  positive,
  neutral,
}) => {
  let changeColor = "text-slate-500";
  let icon = null as React.ReactNode;

  if (!neutral) {
    if (positive) {
      changeColor = "text-emerald-600";
      icon = <ArrowUpRight className="h-3 w-3" />;
    } else {
      changeColor = "text-red-500";
      icon = <ArrowDownRight className="h-3 w-3" />;
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-200">
      <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
        <span>{label}</span>
        <Info className="h-3.5 w-3.5 text-slate-300" />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-semibold text-slate-900">{value}</span>
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium ${changeColor}`}
        >
          {icon}
          {change}
        </span>
      </div>
    </div>
  );
};

type AlertTypeRowProps = {
  color: string;
  label: string;
  count: number;
  percent: string;
};

const AlertTypeRow: React.FC<AlertTypeRowProps> = ({
  color,
  label,
  count,
  percent,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-slate-600">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </div>
    <div className="flex items-center gap-3 text-[11px] text-slate-500">
      <span>{count}</span>
      <span>{percent}</span>
    </div>
  </div>
);

type ZoneRowProps = {
  title: string;
  subtitle: string;
  level: string;
  levelColor: string;
};

const ZoneRow: React.FC<ZoneRowProps> = ({
  title,
  subtitle,
  level,
  levelColor,
}) => (
  <div className="flex items-start justify-between gap-2">
    <div className="flex items-start gap-2">
      <MapPin className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
      <div>
        <div className="text-[13px] font-semibold text-slate-900">{title}</div>
        <div className="text-[11px] text-slate-500">{subtitle}</div>
      </div>
    </div>
    <span className={`text-[11px] font-semibold ${levelColor}`}>{level}</span>
  </div>
);

type InsightBannerProps = {
  tone: "info" | "warning";
  title: string;
  description: string;
};

const InsightBanner: React.FC<InsightBannerProps> = ({
  tone,
  title,
  description,
}) => {
  const isInfo = tone === "info";
  const bg = isInfo
    ? "bg-sky-50 border-sky-100"
    : "bg-amber-50 border-amber-100";
  const iconColor = isInfo ? "text-sky-500" : "text-amber-500";
  const textColor = isInfo ? "text-sky-900" : "text-amber-900";

  return (
    <div
      className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-xs ${bg} ${textColor}`}
    >
      {isInfo ? (
        <Info className={`mt-0.5 h-4 w-4 ${iconColor}`} />
      ) : (
        <AlertTriangle className={`mt-0.5 h-4 w-4 ${iconColor}`} />
      )}
      <div>
        <div className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide">
          {title}
        </div>
        <p className="text-[11px] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

type NetworkRowProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const NetworkRow: React.FC<NetworkRowProps> = ({ label, value, icon }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-1 text-slate-600">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-emerald-500"
        style={{ width: value }}
      />
    </div>
  </div>
);

const FooterButton: React.FC<{
  children: React.ReactNode;
  icon: React.ReactNode;
}> = ({ children, icon }) => (
  <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
    {icon}
    {children}
  </button>
);
