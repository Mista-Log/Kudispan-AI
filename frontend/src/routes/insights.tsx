import { useEffect } from "react";
import { PageShell } from "@/components/page-shell";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Sparkles, DollarSign, ArrowUpRight, BarChart3 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const bars = [42, 55, 38, 67, 71, 60, 84, 78, 92, 70, 88, 96];

function InsightsPage() {
  useEffect(() => {
    document.title = "Financial Insights — Kudispan AI";
  }, []);

  const max = Math.max(...bars);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Executive Analytics
              </span>
              <h1 className="mt-1 font-display text-4xl sm:text-5xl">Financial Insights</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Real-time visibility into revenue velocity, cashflow, and expense distribution.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Runway Forecast: 18.5 Months</span>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-3">
            <Metric label="Revenue (MTD)" value="$42,910.00" delta="+12.4%" up />
            <Metric label="Expenses (MTD)" value="$28,140.00" delta="-4.1%" up={false} />
            <Metric label="Net margin" value="34.4%" delta="+2.3%" up />
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Revenue — Last 12 Months
                </div>
                <div className="mt-1 font-display text-3xl sm:text-4xl text-foreground font-bold">
                  $418,220.00
                </div>
              </div>
              <div className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                USD
              </div>
            </div>

            <div className="mt-8 flex h-52 items-end gap-2 sm:gap-3">
              {bars.map((v, i) => (
                <div key={i} className="group relative flex-1 flex flex-col items-center h-full justify-end">
                  <motion.div
                    initial={{ height: "0%" }}
                    animate={{ height: `${(v / max) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-t-md bg-primary/75 transition-colors group-hover:bg-primary"
                  />
                  <div className="absolute -top-7 hidden rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background group-hover:block z-10 font-mono">
                    ${v}k
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between text-xs font-medium text-muted-foreground">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2">
            <Breakdown
              title="Top expense categories"
              items={[
                ["Payroll & Contractors", 62],
                ["Software & Cloud", 14],
                ["Marketing & Growth", 11],
                ["Office & Logistics", 8],
                ["Other Expenses", 5],
              ]}
            />
            <Breakdown
              title="Revenue by client"
              items={[
                ["Atlas Studio", 38],
                ["Verge Labs", 27],
                ["Mercer & Bell", 18],
                ["Field Goods", 11],
                ["Other Accounts", 6],
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  );
}

function Metric({ label, value, delta, up }: { label: string; value: string; delta: string; up?: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold text-foreground">{value}</div>
      <div
        className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
          up ? "text-primary" : "text-amber-600 dark:text-amber-400"
        }`}
      >
        {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        <span>{delta} vs last month</span>
      </div>
    </motion.div>
  );
}

function Breakdown({ title, items }: { title: string; items: [string, number][] }) {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <ul className="mt-5 space-y-4">
        {items.map(([k, v], idx) => (
          <li key={k}>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-foreground">{k}</span>
              <span className="text-muted-foreground font-mono">{v}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${v}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default InsightsPage;
