import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/page-shell";
import { HeroShowcase } from "@/components/hero-showcase";
import {
  ArrowRight,
  MessageSquareText,
  Receipt,
  Send,
  LineChart,
  ShieldCheck,
  Sparkles,
  Building2,
  CheckCircle2,
  Check,
  CreditCard,
  Zap,
  Lock,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Bot,
  User,
} from "lucide-react";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Kudispan AI — Business banking, by conversation";
  }, []);

  return (
    <PageShell>
      <Hero />
      <LogoStrip />
      <Features />
      <InteractiveChatDemo />
      <HowItWorks />
      <ComparisonSection />
      <Testimonials />
      <CTA />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Soft Ambient Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_0%,oklch(0.93_0.06_165)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Announcement Pill */}
          <motion.div variants={fadeUp} className="mb-6 inline-block">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Next-Gen Financial Intelligence</span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1 font-semibold text-foreground group-hover:text-primary">
                Try 30 days free <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Business banking, <br />
            <span className="italic text-primary">by conversation.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed"
          >
            Kudispan AI is your conversational finance operator. Issue invoices, disburse payments,
            reconcile multiple accounts, and answer <em className="text-foreground font-medium">"where did the money go?"</em> — all in a single chat.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
            >
              <span>Start free account</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-muted hover:border-border/90"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Try interactive assistant</span>
            </Link>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Bank-grade 256-bit encryption</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-primary" />
              <span>ALATPay payment rails</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Showcase Carousel (Commerce, Business & Banking) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroShowcase />
      </motion.div>
    </section>
  );
}

function LogoStrip() {
  const partners = [
    "Northwind Co.",
    "Atlas Studio",
    "Mercer & Bell",
    "Field Goods",
    "Verge Labs",
    "Lumen Press",
    "Kinfolk Retail",
    "Apex Holdings",
  ];

  return (
    <section className="border-y border-border/60 bg-card/40 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Powering commerce & finance for high-growth modern teams
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="font-display text-lg font-medium text-foreground/60 transition-colors hover:text-foreground md:text-xl"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Send,
      title: "Move money by text",
      badge: "Instant Transfers",
      body: "Pay vendors, disburse payroll, and transfer between business accounts. Just state the amount and recipient.",
    },
    {
      icon: Receipt,
      title: "Autonomous invoicing",
      badge: "ALATPay Integrated",
      body: "Draft and dispatch multi-currency invoices with embedded payment links, automatic net terms, and polite follow-ups.",
    },
    {
      icon: LineChart,
      title: "Strategic cash insights",
      badge: "Predictive Analytics",
      body: "Ask about current runway, month-over-month burn rate, tax forecasts, or top vendor expenses in plain language.",
    },
    {
      icon: MessageSquareText,
      title: "Unified finance inbox",
      badge: "Smart Ledger",
      body: "Consolidate bank alerts, invoice settlements, vendor receipts, and accounting queries into a single conversational feed.",
    },
    {
      icon: ShieldCheck,
      title: "Bank-grade safeguards",
      badge: "Confirm-Before-Send",
      body: "Every action that touches capital generates an interactive verification modal. You always retain ultimate sign-off.",
    },
    {
      icon: Sparkles,
      title: "Workflows that learn",
      badge: "Context Aware",
      body: "Kudispan remembers recurring contractor rates, supplier tax IDs, and recurring billing dates for effortless repeat actions.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Zap className="h-3.5 w-3.5" /> Capabilities
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
            An entire financial command center, in your pocket.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Everything your business needs to move faster, manage cashflow, and eliminate manual accounting overhead.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map(({ icon: Icon, title, badge, body }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                  {badge}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-normal text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              <span>Explore feature</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function InteractiveChatDemo() {
  const scenarios = [
    {
      id: "invoice",
      label: "Draft an Invoice",
      prompt: "Send invoice #INV-0241 to Atlas Studio for $4,250 due net-15 for branding sprint.",
      response: {
        text: "I've drafted invoice #INV-0241 for Atlas Studio. Review details before dispatch:",
        type: "invoice",
        data: {
          client: "Atlas Studio",
          invoiceNumber: "INV-0241",
          amount: "$4,250.00",
          dueDate: "Net-15 (Aug 30, 2026)",
          status: "Draft ready",
        },
      },
    },
    {
      id: "runway",
      label: "Check Cash Runway",
      prompt: "What is our current cash position and runway at current burn?",
      response: {
        text: "Here is your live consolidated treasury health snapshot:",
        type: "runway",
        data: {
          balance: "$182,430.18",
          burnRate: "$24,500 / mo (-12.4%)",
          runway: "7.4 Months",
          health: "Healthy (Green)",
        },
      },
    },
    {
      id: "payment",
      label: "Disburse Supplier Wire",
      prompt: "Pay $3,200 to Mercer & Bell for July warehouse logistics from Operating account.",
      response: {
        text: "Transfer prepared. Ready to disburse via secure bank rails upon confirmation:",
        type: "payment",
        data: {
          recipient: "Mercer & Bell Logistics",
          amount: "$3,200.00",
          source: "Operating Account (•••• 4521)",
          fee: "$0.00 (ALATPay Direct)",
        },
      },
    },
    {
      id: "insights",
      label: "Top Expenses",
      prompt: "Show our top 3 expense categories for this month.",
      response: {
        text: "Here are your highest outbound expense categories for August:",
        type: "insights",
        data: {
          items: [
            { name: "Payroll & Contractors", amount: "$18,400.00", pct: "62%" },
            { name: "Cloud Infrastructure & SaaS", amount: "$4,120.00", pct: "14%" },
            { name: "Logistics & Office", amount: "$3,200.00", pct: "11%" },
          ],
        },
      },
    },
  ];

  const [activeScenario, setActiveScenario] = useState(0);
  const current = scenarios[activeScenario];

  return (
    <section className="border-t border-border/60 bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Explainer & Selector Buttons */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Interactive Demo
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
              Talk to your money. <br />
              <span className="italic text-primary">Kudispan does the work.</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Experience the power of conversational banking. Select a prompt below to see how Kudispan AI handles real-world business transactions with structured safety controls.
            </p>

            <div className="mt-8 flex flex-col gap-2.5">
              {scenarios.map((s, idx) => {
                const isSelected = idx === activeScenario;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveScenario(idx)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-sm font-medium transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
                        : "border-border bg-card hover:bg-muted text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        0{idx + 1}
                      </span>
                      <span>{s.label}</span>
                    </span>
                    <ArrowRight className={`h-4 w-4 transition-transform ${isSelected ? "translate-x-1 text-primary" : "text-muted-foreground"}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <span>Launch full interactive assistant</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Simulated Chat Window with Live Transitions */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
              {/* Chat Window Chrome */}
              <div className="flex items-center justify-between border-b border-border/80 bg-card px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Kudispan Assistant v2.4</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span>ALATPay Connected</span>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="min-h-[380px] p-6 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    {/* User Prompt */}
                    <div className="flex justify-end">
                      <div className="flex items-start gap-2.5 max-w-[85%]">
                        <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
                          {current.prompt}
                        </div>
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-foreground">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Kudispan Assistant Response */}
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2.5 max-w-[90%]">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display font-bold">
                          K
                        </div>
                        <div className="space-y-3">
                          <div className="rounded-2xl rounded-tl-sm bg-card border border-border p-4 text-sm text-foreground shadow-sm">
                            <p>{current.response.text}</p>

                            {/* Structured Action Cards */}
                            {current.response.type === "invoice" && (
                              <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs">
                                <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                                  <span className="font-semibold text-primary">Invoice Summary</span>
                                  <span className="rounded bg-primary/20 px-2 py-0.5 font-medium text-primary">Ready to Send</span>
                                </div>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-foreground/80">
                                  <div>Recipient: <strong className="text-foreground">{current.response.data.client}</strong></div>
                                  <div>Total: <strong className="text-primary font-bold text-sm">{current.response.data.amount}</strong></div>
                                  <div>Invoice ID: {current.response.data.invoiceNumber}</div>
                                  <div>Terms: {current.response.data.dueDate}</div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                  <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                                    Send via ALATPay Link
                                  </button>
                                  <button className="rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                                    Edit items
                                  </button>
                                </div>
                              </div>
                            )}

                            {current.response.type === "runway" && (
                              <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-border bg-muted/40 p-3 text-center">
                                <div>
                                  <div className="text-[11px] text-muted-foreground">Operating Cash</div>
                                  <div className="mt-0.5 font-display text-lg font-bold text-foreground">{current.response.data.balance}</div>
                                </div>
                                <div>
                                  <div className="text-[11px] text-muted-foreground">Est. Runway</div>
                                  <div className="mt-0.5 font-display text-lg font-bold text-primary">{current.response.data.runway}</div>
                                </div>
                                <div>
                                  <div className="text-[11px] text-muted-foreground">Monthly Burn</div>
                                  <div className="mt-0.5 font-display text-xs font-medium text-foreground">{current.response.data.burnRate}</div>
                                </div>
                              </div>
                            )}

                            {current.response.type === "payment" && (
                              <div className="mt-3 rounded-xl border border-border bg-card p-3.5 text-xs">
                                <div className="flex items-center justify-between text-muted-foreground">
                                  <span>Transfer recipient:</span>
                                  <span className="font-semibold text-foreground">{current.response.data.recipient}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between text-muted-foreground">
                                  <span>Amount to debit:</span>
                                  <span className="font-bold text-foreground text-sm">{current.response.data.amount}</span>
                                </div>
                                <div className="mt-3 rounded-lg bg-primary/10 p-2.5 text-xs text-primary flex items-center gap-2">
                                  <ShieldCheck className="h-4 w-4 shrink-0" />
                                  <span>Confirm transfer with one click to disburse instantly.</span>
                                </div>
                              </div>
                            )}

                            {current.response.type === "insights" && (
                              <div className="mt-3 space-y-2 text-xs">
                                {current.response.data.items?.map((item: any) => (
                                  <div key={item.name} className="flex items-center justify-between rounded-lg bg-card border border-border p-2">
                                    <span className="font-medium text-foreground">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="text-muted-foreground font-mono">{item.amount}</span>
                                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{item.pct}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Chat Input Bar */}
              <div className="border-t border-border bg-card p-3.5">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    disabled
                    value={current.prompt}
                    className="w-full bg-transparent text-xs text-muted-foreground outline-none"
                  />
                  <span className="rounded bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
                    Simulated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect business rails",
      body: "Link your business bank accounts, cards, and ALATPay merchant profile securely in under two minutes.",
      tag: "OAuth & TLS 1.3",
    },
    {
      step: "02",
      title: "Instruct via chat or voice",
      body: "Speak naturally: 'Bill Acme Corp $2,000' or 'Show overdue receivables'. Kudispan parses complex intent.",
      tag: "NLP Parser",
    },
    {
      step: "03",
      title: "Approve & execute",
      body: "Review the instant visual confirmation preview. One tap dispatches payments, creates invoices, or exports audits.",
      tag: "Confirm Safeguard",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Workflow
        </span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">
          Three steps to frictionless finance.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Replace tedious manual dashboards with effortless conversational commands.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-16 grid gap-8 md:grid-cols-3"
      >
        {steps.map((s, idx) => (
          <motion.div
            key={s.step}
            variants={fadeUp}
            className="relative flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-normal text-primary">
                  {s.step}
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  {s.tag}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>

            <div className="mt-8 border-t border-border/60 pt-4 text-xs font-medium text-muted-foreground">
              Step {idx + 1} of 3
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="border-t border-border/60 bg-card/40 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Comparison
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            Why founders switch to Kudispan AI.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Legacy way */}
          <div className="rounded-2xl border border-border bg-background p-8 opacity-75">
            <h3 className="text-xl font-semibold text-muted-foreground">Legacy Dashboards</h3>
            <p className="mt-1 text-xs text-muted-foreground">Spreadsheets, clunky bank portals & manual entries</p>
            <ul className="mt-6 space-y-3.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-red-500 font-bold">✕</span>
                <span>Switching between 4+ banking and invoicing web apps</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-red-500 font-bold">✕</span>
                <span>Hours spent manually reconciling invoice status & payments</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-red-500 font-bold">✕</span>
                <span>Delayed cash position insights requiring spreadsheet updates</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-red-500 font-bold">✕</span>
                <span>Complex multi-step invoice creation flows</span>
              </li>
            </ul>
          </div>

          {/* Kudispan way */}
          <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-xl shadow-primary/5">
            <div className="absolute -top-3.5 right-6 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
              The Kudispan Standard
            </div>
            <h3 className="text-xl font-semibold text-foreground">Kudispan AI Operating System</h3>
            <p className="mt-1 text-xs text-primary font-medium">One unified conversational intelligence</p>
            <ul className="mt-6 space-y-3.5 text-sm text-foreground">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary font-bold" />
                <span>Single conversational interface for all banking & money movement</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary font-bold" />
                <span>Autonomous reconciliation with instant invoice settlement alerts</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary font-bold" />
                <span>Instant runway and financial answers on demand in seconds</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary font-bold" />
                <span>One-sentence invoice generation with integrated ALATPay links</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      quote:
        "Kudispan AI eliminated about 10 hours a week of manual invoice chasing and balance checking. I just message the assistant before my team meetings.",
      author: "Amaka Okafor",
      role: "Founder, Kinfolk Apparel & Studio",
    },
    {
      quote:
        "The ability to issue invoices and disburse supplier payments by typing one sentence is game-changing. It feels like having a senior CFO in my pocket.",
      author: "Marcus Chen",
      role: "Managing Director, Verge Labs",
    },
    {
      quote:
        "Our clients love the instant payment links, and our operating cash reconciles without us lifting a finger. Best fintech upgrade we made this year.",
      author: "Sarah Jenkins",
      role: "Head of Operations, Mercer & Bell",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Testimonials
        </span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">
          Loved by operators & founders.
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <div
            key={r.author}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-sm"
          >
            <p className="text-sm leading-relaxed text-foreground/90 italic">
              "{r.quote}"
            </p>
            <div className="mt-6 border-t border-border/60 pt-4">
              <div className="font-semibold text-sm text-foreground">{r.author}</div>
              <div className="text-xs text-muted-foreground">{r.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-primary px-8 py-16 text-center text-primary-foreground shadow-2xl"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-black/10 blur-2xl" />

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight">
          Stop tab-switching. <br />
          Start talking to your finances.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-primary-foreground/90 text-base sm:text-lg">
          Join thousands of businesses streamlining banking, invoices, and payments with Kudispan AI. Try it free for 30 days.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/signup"
            className="rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-md transition-all hover:opacity-95 hover:scale-[1.02]"
          >
            Create free account
          </Link>
          <Link
            to="/docs"
            className="rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Read documentation
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
