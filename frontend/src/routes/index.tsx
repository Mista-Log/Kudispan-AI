import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/page-shell-home";
import {
  ArrowRight,
  MessageSquareText,
  Receipt,
  Send,
  LineChart,
  ShieldCheck,
  Sparkles,
  Wallet,
  TrendingUp,
  CreditCard,
  Coins,
  ChartNoAxesCombined,
} from "lucide-react";


function LandingPage() {
  useEffect(() => { document.title = 'Kudispan AI — Business banking, by conversation'; }, []);
  return (
    <PageShell>
      <Hero />
      <LogoStrip />
      <Features />
      <ChatPreview />
      <HowItWorks />
      <CTA />
    </PageShell>
  );
}


function Hero() {
  const floatingIcons = [
    {
      Icon: Wallet,
      position: "left-[8%] top-[18%]",
      delay: "0s",
      duration: "5s",
      rotate: "-12deg",
    },
    {
      Icon: TrendingUp,
      position: "right-[12%] top-[15%]",
      delay: "1s",
      duration: "6s",
      rotate: "10deg",
    },
    {
      Icon: Receipt,
      position: "left-[16%] top-[60%]",
      delay: "1.5s",
      duration: "5.5s",
      rotate: "8deg",
    },
    {
      Icon: CreditCard,
      position: "right-[15%] top-[58%]",
      delay: "0.5s",
      duration: "6.5s",
      rotate: "-8deg",
    },
    {
      Icon: Coins,
      position: "left-[30%] top-[12%]",
      delay: "2s",
      duration: "7s",
      rotate: "-5deg",
    },
    {
      Icon: ChartNoAxesCombined,
      position: "right-[30%] top-[68%]",
      delay: "1.2s",
      duration: "5.8s",
      rotate: "6deg",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.93_0.05_165)_0%,transparent_70%)]" />

      {/* Floating finance icons */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        {floatingIcons.map(
          ({ Icon, position, delay, duration, rotate }, index) => (
            <div
              key={index}
              className={`absolute ${position} hidden rounded-2xl border border-primary/15 bg-card/70 p-4 text-primary shadow-lg shadow-primary/5 backdrop-blur-md sm:block`}
              style={{
                animation: `finance-float ${duration} ease-in-out ${delay} infinite`,
                transform: `rotate(${rotate})`,
              }}
            >
              <Icon className="h-6 w-6 md:h-7 md:w-7" />
            </div>
          )
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-24 text-center md:pb-28 md:pt-32">

        <h1 className="mt-7 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
          Business banking,
          <br />
          <span className="italic text-primary">
            by conversation.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          Kudispan AI is your AI finance operator. Send invoices,
          schedule payments, reconcile accounts, and answer
          "where did the money go?" — just by chatting.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-muted"
          >
            Try the assistant
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Smarter financial management in supported African languages.
        </p>
      </div>

      {/* Local animation */}
      <style>{`
        @keyframes finance-float {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .finance-floating-icon {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}


function LogoStrip() {
  const items = ["Northwind Co.", "Atlas Studio", "Mercer & Bell", "Field Goods", "Verge Labs", "Lumen Press"];
  return (
    <section className="border-y border-border/60 bg-card/50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 py-6 text-sm text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Trusted by teams at</span>
        {items.map((i) => (
          <span key={i} className="font-display text-lg text-foreground/70">{i}</span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Send, title: "Move money", body: "Pay vendors, run payroll, transfer between accounts — described in plain English, executed in seconds." },
    { icon: Receipt, title: "Invoice anyone", body: "Draft, send, and chase invoices from a single sentence. Recurring billing included." },
    { icon: LineChart, title: "Financial insights", body: "Ask anything about cash flow, runway, top expenses, or month-over-month trends." },
    { icon: MessageSquareText, title: "One inbox", body: "Customer questions, vendor receipts and payment confirmations — all summarised in chat." },
    { icon: ShieldCheck, title: "Bank-grade security", body: "End-to-end encryption, SOC 2 in progress, and confirm-before-send for every transfer." },
    { icon: Sparkles, title: "Workflows that learn", body: "Kudispan AI remembers your accounts, contacts and rules so the second time is one click." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-primary">What it does</p>
        <h2 className="mt-3 text-4xl md:text-5xl">An entire finance team, in your pocket.</h2>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-card p-6">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-xl">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChatPreview() {
  return (
    <section className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Live demo</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Just ask. Kudispan AI does the rest.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Confirm-before-send keeps you in control. Kudispan AI drafts the action; you approve it.
          </p>
          <Link
            to="/chat"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open assistant <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="space-y-3">
            <Bubble who="you">Send invoice to Atlas Studio for $4,250, due net-15.</Bubble>
            <Bubble who="kudispan">
              Drafted invoice <strong>#INV-0241</strong> for Atlas Studio, $4,250.00, due July 11.
              Send now?
            </Bubble>
            <Bubble who="you">Yes. Also, what's our cash position?</Bubble>
            <Bubble who="kudispan">
              Sent ✓ Your operating balance is <strong>$182,430</strong>. Runway: ~7.4 months at current burn.
            </Bubble>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ who, children }: { who: "you" | "kudispan"; children: React.ReactNode }) {
  const mine = who === "you";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
          mine
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Connect your accounts", b: "Link your business bank, cards, and accounting in minutes." },
    { n: "02", t: "Chat naturally", b: "Ask, instruct, or schedule — Kudispan AI translates words into actions." },
    { n: "03", t: "Approve & go", b: "Every transaction shows a clear preview. You stay in the loop." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n}>
            <div className="font-display text-5xl text-primary">{s.n}</div>
            <h3 className="mt-4 text-2xl">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="rounded-3xl border border-border bg-primary px-8 py-14 text-center text-primary-foreground">
        <h2 className="text-4xl md:text-5xl">Stop tab-switching. Start talking.</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Kudispan AI replaces five finance tools with one chat. Try it free for 30 days, no card required.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="rounded-md bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:opacity-90">
            Create free account
          </Link>
          <Link to="/docs" className="rounded-md border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/10">
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
