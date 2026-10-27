import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageShellDashboard } from "@/components/page-shell-dashboard";
import {
  MessageSquare,
  Receipt,
  ArrowLeftRight,
  LineChart,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap,
  Languages,
} from "lucide-react";

// ─── mock data ────────────────────────────────────────────────────────────────
const stats = [
  { label: "Revenue (MTD)", value: "₦42,910", delta: "+12.4%", up: true },
  { label: "Expenses (MTD)", value: "₦28,140", delta: "+4.1%", up: false },
  { label: "Net Margin", value: "34.4%", delta: "+2.3%", up: true },
  { label: "Pending Invoices", value: "7", delta: "2 overdue", up: false },
];

const recentActivity = [
  { icon: CheckCircle2, color: "text-emerald-500", label: "Invoice #INV-0042 paid", time: "2 min ago" },
  { icon: AlertCircle,  color: "text-amber-500",   label: "Invoice #INV-0039 overdue", time: "1 hr ago" },
  { icon: ArrowLeftRight, color: "text-blue-500",  label: "Payment sent — ₦15,000", time: "3 hrs ago" },
  { icon: CheckCircle2, color: "text-emerald-500", label: "Invoice #INV-0041 paid", time: "Yesterday" },
  { icon: Clock,        color: "text-muted-foreground", label: "Invoice #INV-0040 sent", time: "2 days ago" },
];

const quickActions = [
  { label: "New Invoice",   href: "/invoices",  icon: Receipt,          desc: "Create & send instantly" },
  { label: "Send Payment",  href: "/payments",  icon: ArrowLeftRight,   desc: "Transfer funds" },
  { label: "AI Assistant",  href: "/chat",       icon: MessageSquare,    desc: "Ask anything" },
  { label: "Translate",     href: "/translate",  icon: Languages,        desc: "Multi-language support" },
  { label: "Insights",      href: "/insights",   icon: LineChart,        desc: "Financial analytics" },
];

const bars = [42, 55, 38, 67, 71, 60, 84, 78, 92, 70, 88, 96];
const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
const maxBar = Math.max(...bars);

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard — Kudispan AI";
  }, []);

  // Greet by hour
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <PageShellDashboard>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Welcome banner ─────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold tracking-tight">
              {greeting} 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here's what's happening with your business today.
            </p>
          </div>
          <Link
            to="/chat"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:mt-0"
          >
            <Zap className="h-4 w-4" />
            Ask AI Assistant
          </Link>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{s.value}</p>
              <div
                className={`mt-1.5 inline-flex items-center gap-1 text-xs font-medium ${
                  s.up ? "text-emerald-500" : "text-amber-500"
                }`}
              >
                {s.up ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick actions ──────────────────────────────────────────── */}
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Quick actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.href}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Revenue chart + activity ───────────────────────────────── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* chart */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue — last 12 months</p>
                <p className="mt-1 font-display text-3xl font-semibold">₦418,220</p>
              </div>
              <Link
                to="/insights"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Full report <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-6 flex h-44 items-end gap-1.5">
              {bars.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/70 transition-all hover:bg-primary cursor-default"
                  style={{ height: `${(v / maxBar) * 100}%` }}
                  title={`₦${v}k`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          {/* activity feed */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Recent activity</h3>
            <ul className="space-y-4">
              {recentActivity.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className={`mt-0.5 h-4 w-4 shrink-0 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/invoices"
              className="mt-5 flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

      </div>
    </PageShellDashboard>
  );
}
