// src/pages/Landing.tsx
import React from "react";
import {
  ShieldCheck,
  Play,
  CheckCircle2,
  Activity,
  AlertTriangle,
  Wifi,
  Battery,
  Camera,
  MapPin,
  Phone,
  Siren,
} from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Nav */}
      <header className="w-full bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Left / Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">KhetGuard</div>
              <div className="text-xs text-slate-500">Intrusion Detection</div>
            </div>
          </div>

          {/* Right / Auth buttons */}
          <div className="flex items-center gap-3">
            <button className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 md:block">
              Signup
            </button>
            <button className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {/* HERO */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
            {/* Hero text */}
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Detect intrusions in seconds, not minutes.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-600">
                Real-time monitoring for farms, warehouses, and remote sites.
                Connect cameras, sensors, and geofences instantly.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600">
                  Start
                </button>
                <button className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </button>
              </div>

              {/* small stats row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs text-slate-600">
                <div className="inline-flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  </span>
                  <span>97% Uptime</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100">
                    <Activity className="h-3 w-3 text-sky-600" />
                  </span>
                  <span>24s Response</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                  </span>
                  <span>12% False Positive Rate</span>
                </div>
              </div>
            </div>

            {/* Hero dashboard card */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-md rounded-3xl bg-slate-900/5 p-1.5">
                <div className="rounded-3xl bg-white p-4 shadow-lg shadow-emerald-100">
                  {/* top row status */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      System Armed
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Wifi className="h-3.5 w-3.5" />
                      <Battery className="h-3.5 w-3.5" />
                      <span>87%</span>
                    </div>
                  </div>

                  {/* metric grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <div className="text-[11px] text-slate-500">Status</div>
                      <div className="mt-1 text-sm font-semibold text-emerald-600">
                        Armed
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <div className="text-[11px] text-slate-500">
                        Active Alerts
                      </div>
                      <div className="mt-1 text-sm font-semibold text-amber-500">
                        3
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <div className="text-[11px] text-slate-500">Online</div>
                      <div className="mt-1 text-sm font-semibold text-sky-600">
                        12/14
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <div className="text-[11px] text-slate-500">
                        Last Motion
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-800">
                        2m
                      </div>
                    </div>
                  </div>

                  {/* mini geofence + quick actions */}
                  <div className="mt-4 flex gap-3">
                    {/* map */}
                    <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/70 px-4 py-6">
                      <div className="relative h-24 w-full max-w-[150px] rounded-2xl border border-emerald-200 bg-emerald-100/80">
                        <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-amber-400" />
                        <div className="absolute right-4 bottom-4 h-2 w-2 rounded-full bg-emerald-500" />
                        <div className="absolute left-6 bottom-5 h-2 w-2 rounded-full bg-red-500" />
                        <div className="absolute inset-5 flex items-center justify-center rounded-xl border border-dashed border-emerald-400 bg-emerald-50/90">
                          <MapPin className="h-4 w-4 text-emerald-600" />
                        </div>
                      </div>
                    </div>

                    {/* quick actions */}
                    <div className="flex flex-col gap-2">
                      <button className="inline-flex items-center justify-center rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white">
                        <Siren className="mr-1.5 h-3.5 w-3.5" />
                        Trigger Siren
                      </button>
                      <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white">
                        <Phone className="mr-1.5 h-3.5 w-3.5" />
                        Call Neighbor
                      </button>
                      <button className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white">
                        SOS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              All your intrusion signals in one dashboard.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {/* Row 1 */}
              <FeatureCard
                badge="System Armed"
                title="Unified Dashboard"
                description="Monitor all devices, zones, and alerts from a single command center."
                footer={
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Online
                    </span>
                    <span>12/14 Devices</span>
                  </div>
                }
              />
              <FeatureCard
                badge="AI"
                title="AI Classification"
                description="Distinguish between humans, animals, and vehicles with 90%+ accuracy."
                footer={
                  <div className="mt-3 flex gap-2 text-[11px]">
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-600">
                      Human (90%)
                    </span>
                    <span className="rounded-full bg-sky-50 px-2 py-0.5 text-sky-600">
                      Animal (80%)
                    </span>
                  </div>
                }
              />
              <FeatureCard
                badge="Zones"
                title="Smart Geofencing"
                description="Create custom zones with different alert and response protocols."
                footer={
                  <div className="mt-3 h-12 rounded-xl border border-dashed border-emerald-300 bg-emerald-50" />
                }
              />

              {/* Row 2 */}
              <FeatureCard
                badge="Video"
                title="Multi-Camera Feeds"
                description="View live streams from all connected cameras in real-time grid view."
                footer={
                  <div className="mt-3 grid grid-cols-3 gap-1">
                    <div className="h-8 rounded-md bg-slate-900" />
                    <div className="h-8 rounded-md bg-slate-900" />
                    <div className="h-8 rounded-md bg-slate-900" />
                  </div>
                }
              />
              <FeatureCard
                badge="Insights"
                title="Activity Analytics"
                description="Track patterns, identify hotspots, and optimize your security coverage."
                footer={
                  <div className="mt-3 flex h-10 items-end gap-1">
                    <div className="h-4 flex-1 rounded-sm bg-emerald-400" />
                    <div className="h-6 flex-1 rounded-sm bg-sky-400" />
                    <div className="h-8 flex-1 rounded-sm bg-emerald-500" />
                    <div className="h-5 flex-1 rounded-sm bg-sky-500" />
                  </div>
                }
              />
              <FeatureCard
                badge="Automation"
                title="Smart Automation"
                description="Set up automated responses: sirens, calls, SMS, and custom workflows."
                footer={
                  <div className="mt-3 flex items-center gap-2 text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                  </div>
                }
              />
            </div>
          </div>
        </section>

        {/* PRODUCT PREVIEW */}
        <section className="border-y border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              See KhetGuard in action.
            </h2>

            <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200">
              {/* tabs */}
              <div className="flex gap-2 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-medium text-slate-600">
                <button className="rounded-full bg-emerald-500 px-4 py-1.5 text-white">
                  Dashboard
                </button>
                <button className="rounded-full px-4 py-1.5 hover:bg-slate-100">
                  Feeds
                </button>
                <button className="rounded-full px-4 py-1.5 hover:bg-slate-100">
                  Reports
                </button>
                <button className="rounded-full px-4 py-1.5 hover:bg-slate-100">
                  Alerts
                </button>
              </div>

              {/* preview body */}
              <div className="flex bg-slate-900/95 text-slate-50">
                {/* side nav */}
                <aside className="flex w-16 flex-col items-center gap-4 border-r border-slate-800 py-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500">
                    <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                  <div className="h-8 w-8 rounded-2xl bg-slate-800" />
                  <div className="h-8 w-8 rounded-2xl bg-slate-800" />
                  <div className="h-8 w-8 rounded-2xl bg-slate-800" />
                </aside>

                {/* content */}
                <div className="flex-1 px-6 py-5">
                  <h3 className="text-sm font-semibold text-white">
                    Recent Alerts
                  </h3>
                  <div className="mt-4 space-y-3 text-xs">
                    <AlertRow
                      type="Human Detected"
                      zone="North Gate"
                      time="2 min ago"
                      badgeColor="bg-rose-500"
                    />
                    <AlertRow
                      type="Vehicle Detected"
                      zone="Loading Bay"
                      time="5 min ago"
                      badgeColor="bg-amber-400"
                    />
                    <AlertRow
                      type="Motion Detected"
                      zone="Barn Area"
                      time="12 min ago"
                      badgeColor="bg-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Built for real-world perimeters.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-4">
              <UseCaseCard
                label="Popular"
                labelColor="bg-emerald-100 text-emerald-700"
                title="Farms"
                description="Protect livestock and crops from theft and wildlife intrusion."
              />
              <UseCaseCard
                title="Warehouses"
                description="Secure loading bays and perimeters with 24/7 monitoring."
              />
              <UseCaseCard
                title="Solar Farms"
                description="Protect valuable equipment across vast remote installations."
              />
              <UseCaseCard
                title="Remote Sites"
                description="4G backup ensures connectivity even in isolated locations."
              />
            </div>
          </div>
        </section>

        {/* ANALYTICS + ALERTS CARDS */}
        <section className="bg-slate-100 py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
            {/* Left: chart card */}
            <div className="flex-1">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  Alert Distribution by Zone
                </h3>
                <div className="mt-6 h-44">
                  {/* fake bar chart */}
                  <div className="flex h-full items-end gap-4">
                    <Bar label="North Gate" height="h-32" color="bg-rose-400" />
                    <Bar label="Barn" height="h-24" color="bg-amber-400" />
                    <Bar
                      label="Loading Bay"
                      height="h-16"
                      color="bg-emerald-400"
                    />
                    <Bar label="Perimeter" height="h-10" color="bg-sky-400" />
                    <Bar label="Storage" height="h-6" color="bg-slate-400" />
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  <span className="font-medium text-rose-600">
                    High Risk Zones:
                  </span>{" "}
                  North Gate – 42 alerts this week.
                </div>
              </div>
            </div>

            {/* Right: highlight cards */}
            <div className="flex w-full max-w-md flex-col gap-4">
              <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-900">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  Activity Spike Detected
                </div>
                <p>
                  Unusual activity at 18:00 in Zone B. Review footage for
                  potential intrusions.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Camera Misalignment
                </div>
                <p>
                  Barn camera angle shifted. Adjust positioning to restore full
                  coverage and reduce false alerts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ACT ON WHAT MATTERS */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
            {/* bullets */}
            <div className="flex-1 space-y-5">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Act on what matters.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                Trigger sirens, notify your team, and mark false alarms so the
                system gets smarter with every event.
              </p>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Trigger sirens and alarms remotely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Send instant SOS to emergency contacts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Mark false alarms to improve AI accuracy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Review footage and export evidence.</span>
                </li>
              </ul>
            </div>

            {/* alert list */}
            <div className="flex w-full max-w-md flex-col gap-3">
              <AlertSummaryCard
                type="Human Detected"
                location="North Gate"
                ago="2 min ago"
                badgeColor="bg-rose-500"
              />
              <AlertSummaryCard
                type="Vehicle Approaching"
                location="Loading Bay"
                ago="5 min ago"
                badgeColor="bg-amber-400"
              />
              <AlertSummaryCard
                type="Animal Movement"
                location="Barn Area"
                ago="12 min ago"
                badgeColor="bg-sky-500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <div className="leading-tight">
                  <div className="font-semibold text-white">KhetGuard</div>
                  <div className="text-xs text-slate-400">
                    Intrusion detection for the real world.
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-16 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Product
                </div>
                <div className="mt-3 space-y-2">
                  <button className="block text-left text-slate-300 hover:text-white">
                    Features
                  </button>
                  <button className="block text-left text-slate-300 hover:text-white">
                    Pricing
                  </button>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Company
                </div>
                <div className="mt-3 space-y-2">
                  <button className="block text-left text-slate-300 hover:text-white">
                    About
                  </button>
                  <button className="block text-left text-slate-300 hover:text-white">
                    Privacy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500">
            © 2024 KhetGuard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

/* ---------- Small components ---------- */

type FeatureCardProps = {
  badge?: string;
  title: string;
  description: string;
  footer?: React.ReactNode;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  badge,
  title,
  description,
  footer,
}) => (
  <div className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm shadow-slate-100">
    {badge && (
      <div className="mb-3 inline-flex items-center gap-2 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
          <Camera className="h-3 w-3 text-slate-500" />
          <span>{badge}</span>
        </span>
      </div>
    )}
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
    {footer}
  </div>
);

type UseCaseCardProps = {
  label?: string;
  labelColor?: string;
  title: string;
  description: string;
};

const UseCaseCard: React.FC<UseCaseCardProps> = ({
  label,
  labelColor,
  title,
  description,
}) => (
  <div className="rounded-3xl bg-white p-5 text-sm shadow-sm shadow-slate-100">
    <div className="mb-3 flex items-center justify-between">
      <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100">
        <MapPin className="h-4 w-4 text-slate-700" />
      </div>
      {label && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${labelColor}`}
        >
          {label}
        </span>
      )}
    </div>
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
  </div>
);

type AlertRowProps = {
  type: string;
  zone: string;
  time: string;
  badgeColor: string;
};

const AlertRow: React.FC<AlertRowProps> = ({
  type,
  zone,
  time,
  badgeColor,
}) => (
  <div className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3">
    <div>
      <div className="flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${badgeColor}`}
        >
          LIVE
        </span>
        <span className="font-medium text-white">{type}</span>
      </div>
      <div className="mt-1 text-[11px] text-slate-300">
        {zone} • {time}
      </div>
    </div>
    <button className="rounded-full bg-amber-500 px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-amber-400">
      View
    </button>
  </div>
);

type AlertSummaryProps = {
  type: string;
  location: string;
  ago: string;
  badgeColor: string;
};

const AlertSummaryCard: React.FC<AlertSummaryProps> = ({
  type,
  location,
  ago,
  badgeColor,
}) => (
  <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm shadow-slate-100">
    <div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
          IMG 60×60
        </span>
        <span className="text-sm font-semibold text-slate-900">{type}</span>
      </div>
      <div className="mt-1 text-xs text-slate-500">
        {location} • {ago}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button
        className={`flex h-8 w-8 items-center justify-center rounded-full ${badgeColor} text-white`}
      >
        <Siren className="h-4 w-4" />
      </button>
      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Phone className="h-4 w-4" />
      </button>
    </div>
  </div>
);

type BarProps = {
  label: string;
  height: string;
  color: string;
};

const Bar: React.FC<BarProps> = ({ label, height, color }) => (
  <div className="flex flex-1 flex-col items-center justify-end gap-2 text-[11px] text-slate-500">
    <div className={`w-full rounded-md ${height} ${color}`} />
    <span className="truncate">{label}</span>
  </div>
);
