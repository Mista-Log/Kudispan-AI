import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldCheck, Terminal, MessageSquare, Receipt, ArrowLeftRight, HelpCircle } from "lucide-react";

const sections = [
  {
    id: "intro",
    title: "Introduction",
    icon: BookOpen,
    body: (
      <>
        <p>
          Kudispan AI is an AI-powered conversational financial operating system that empowers founders, finance teams, and modern merchants to execute banking, payments, invoicing, and treasury management through natural conversations.
        </p>
        <p>
          This guide covers everything you need to connect your accounts, configure invoice automation, manage payment rules, and build custom workflows via API.
        </p>
      </>
    ),
  },
  {
    id: "getting-started",
    title: "Getting started",
    icon: Terminal,
    body: (
      <div className="space-y-4">
        <p>Follow these quick onboarding steps to start interacting with your finances:</p>
        <ol className="list-decimal space-y-2.5 pl-5 text-sm leading-relaxed">
          <li>Create an account at <code>/signup</code>.</li>
          <li>Set up your business profile and tax identifier.</li>
          <li>Connect your primary operating bank account or card via ALATPay secure rails.</li>
          <li>Launch the Assistant and try typing: <em>"Show my consolidated balance"</em> or <em>"Draft an invoice"</em>.</li>
        </ol>
      </div>
    ),
  },
  {
    id: "chat",
    title: "Using the assistant",
    icon: MessageSquare,
    body: (
      <>
        <p>The Kudispan natural language engine understands complex financial intents. Examples:</p>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li><em>"Send $500 to John for UI design work from Operating account."</em></li>
          <li><em>"Draft an invoice to Atlas Studio for 20 hours at $120/hr with Net-15 terms."</em></li>
          <li><em>"What were our top 3 expense categories last month, and what is our estimated runway?"</em></li>
        </ul>
        <p className="mt-3">
          <strong>Safety Safeguards:</strong> Every monetary action presents an explicit confirmation card before any funds are moved.
        </p>
      </>
    ),
  },
  {
    id: "invoices",
    title: "Invoicing & payments",
    icon: Receipt,
    body: (
      <>
        <p>
          Generate, send, and track multi-currency invoices directly from the <code>/invoices</code> workspace or in conversation.
        </p>
        <p>
          Invoices automatically include integrated ALATPay direct checkout links, automated receipt generation, and intelligent payment reminders for overdue accounts.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Treasury & transfers",
    icon: ArrowLeftRight,
    body: (
      <>
        <p>
          Move money between internal accounts, disburse vendor wires, and automate payroll disbursements. Kudispan maintains an immutable cryptographic audit log for all activity.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Bank-grade security",
    icon: ShieldCheck,
    body: (
      <p>
        Kudispan employs 256-bit TLS encryption, SOC-2 compliant infrastructure, and OAuth-based tokenized bank connections. Your credentials are never stored in plain text, and dual confirmation is strictly enforced.
      </p>
    ),
  },
  {
    id: "support",
    title: "Support & SLA",
    icon: HelpCircle,
    body: (
      <p>
        Need assistance? Contact our engineering & financial team at{" "}
        <a className="text-primary font-medium underline" href="mailto:hello@kudispan.ai">
          hello@kudispan.ai
        </a>
        . Pro and Enterprise subscribers receive priority 4-hour SLA support.
      </p>
    ),
  },
];

function DocsPage() {
  useEffect(() => {
    document.title = "Documentation — Kudispan AI";
  }, []);

  const [active, setActive] = useState(sections[0].id);
  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <PageShell>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[240px_1fr]">
        <aside className="md:sticky md:top-24 md:self-start">
          <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
            <h2 className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Documentation
            </h2>
            <nav className="mt-2 flex flex-col gap-1 text-sm">
              {sections.map((s) => {
                const Icon = s.icon;
                const isSelected = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <article className="min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <h1 className="font-display text-4xl text-foreground">{current.title}</h1>
              <div className="my-6 border-t border-border/80" />
              <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
                {current.body}
              </div>
            </motion.div>
          </AnimatePresence>
        </article>
      </div>
    </PageShell>
  );
}

export default DocsPage;
