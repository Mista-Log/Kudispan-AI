import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "@/components/page-shell";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const plans = [
  {
    name: "Starter",
    priceMonthly: "$0",
    priceAnnual: "$0",
    sub: "Free forever for freelancers",
    features: [
      "Up to 5 invoices per month",
      "1 connected bank account",
      "Basic conversational assistant",
      "Standard email support",
      "ALATPay payment link checkout",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Business Pro",
    priceMonthly: "$29",
    priceAnnual: "$24",
    sub: "per user / month (billed annually)",
    featured: true,
    features: [
      "Unlimited invoices & customers",
      "Unlimited connected bank feeds",
      "Autonomous cash reconciliation",
      "Automated payment scheduling",
      "Predictive runway analytics",
      "Priority 24/7 financial support",
      "Custom branding on invoices",
    ],
    cta: "Start 30-day trial",
  },
  {
    name: "Scale & Enterprise",
    priceMonthly: "$89",
    priceAnnual: "$75",
    sub: "Tailored to larger finance teams",
    features: [
      "Multi-entity treasury management",
      "Custom ERP & accounting webhooks",
      "Dedicated account strategist",
      "SOC-2 & audit logs export",
      "Custom approval & role workflows",
      "Custom SLA & 99.99% uptime guarantee",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

function PricingPage() {
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    document.title = "Pricing — Kudispan AI";
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={fadeUp} className="inline-block">
            <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-4 font-display text-5xl sm:text-6xl">
            Simple, predictable pricing.
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Start free for 30 days. No credit card required. Upgrade as your business scales.
          </motion.p>

          {/* Billing Cycle Toggle */}
          <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1.5 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                !annual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                annual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Annual billing</span>
              <span className="rounded-full bg-accent/80 px-1.5 py-0.2 text-[10px] font-bold text-accent-foreground">
                Save 20%
              </span>
            </button>
          </motion.div>

          {/* Plan Cards */}
          <motion.div
            variants={staggerContainer}
            className="mt-14 grid gap-8 text-left md:grid-cols-3"
          >
            {plans.map((p) => {
              const price = annual ? p.priceAnnual : p.priceMonthly;
              return (
                <motion.div
                  key={p.name}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`relative flex flex-col justify-between rounded-2xl border p-8 backdrop-blur-sm transition-all ${
                    p.featured
                      ? "border-primary bg-card ring-2 ring-primary/20 shadow-xl shadow-primary/10"
                      : "border-border bg-card shadow-sm hover:border-primary/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl font-semibold text-foreground">{p.name}</h3>
                      {p.featured && (
                        <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                          <Sparkles className="h-3 w-3" /> Most Popular
                        </span>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-5xl font-bold text-foreground">{price}</span>
                        <span className="text-sm text-muted-foreground">/ month</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.sub}</div>
                    </div>

                    <div className="my-7 border-t border-border/80" />

                    <ul className="space-y-3 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-foreground/90">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      to="/signup"
                      className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
                        p.featured
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/95 hover:shadow-lg"
                          : "border border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{p.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  );
}

export default PricingPage;
