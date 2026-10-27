import { useEffect } from "react";
import { PageShell } from "@/components/page-shell";
import { useState } from "react";


const sections = [
  {
    id: "intro",
    title: "Introduction",
    body: (
      <>
        <p>
          Kudispan AI is an AI-powered banking assistant that helps small businesses and individuals manage
          payments, invoices, and financial insights through natural-language conversations.
        </p>
        <p>
          This documentation covers everything you need to use Kudispan AI — from your first message to
          building automated workflows.
        </p>
      </>
    ),
  },
  {
    id: "getting-started",
    title: "Getting started",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Create an account at <code>/signup</code>.</li>
        <li>Complete your business profile.</li>
        <li>Generate invoices with instant ALATPay payment links.</li>
        <li>Open the Assistant and try: <em>"Show my balance"</em> or use the Translator for African languages.</li>
      </ol>
    ),
  },
  {
    id: "chat",
    title: "Using the assistant",
    body: (
      <>
        <p>The assistant understands natural instructions. Examples:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><em>"Send invoice for ₦50,000 to Dangote Ventures for design work."</em></li>
          <li><em>"Translate payment confirmation to Yoruba or Swahili."</em></li>
          <li><em>"How much revenue did we generate this month?"</em></li>
        </ul>
        <p>
          Every action that moves money requires explicit confirmation. Kudispan AI shows a preview before
          executing.
        </p>
      </>
    ),
  },
  {
    id: "invoices",
    title: "Invoices",
    body: (
      <>
        <p>
          Create, send, and track invoices from the <code>/invoices</code> page or directly through chat.
          Invoices support ALATPay payment link generation, instant status updates, and automatic receipts.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <>
        <p>
          Collect payments seamlessly via ALATPay, track incoming transfers, or schedule recurring payments. Kudispan AI
          shows live balances and a full audit log of every transaction.
        </p>
      </>
    ),
  },
  {
    id: "api",
    title: "API & integrations",
    body: (
      <>
        <p>The Kudispan AI REST API lets you embed invoicing and African language translation into your own product.</p>
        <pre className="overflow-x-auto rounded-lg bg-foreground/95 p-4 text-xs text-background">
{`POST /api/invoice/
Authorization: Bearer <token>

{
  "customer_name": "Dangote Ventures",
  "customer_email": "client@example.com",
  "amount": 250000,
  "description": "Website Development"
}`}
        </pre>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Kudispan AI uses end-to-end encryption, secure JWT authentication, and verified payment webhooks.
      </p>
    ),
  },
  {
    id: "support",
    title: "Support",
    body: (
      <p>
        Reach our team at <a className="text-primary underline" href="mailto:support@kudispan.ai">support@kudispan.ai</a>.
        Business and Enterprise plans get priority response within 4 business hours.
      </p>
    ),
  },
];

function DocsPage() {
  useEffect(() => { document.title = 'Documentation — Kudispan AI'; }, []);
  const [active, setActive] = useState(sections[0].id);
  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <PageShell>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-20 md:self-start">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Documentation</h2>
          <nav className="mt-4 flex flex-col gap-1 text-sm">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`rounded-md px-3 py-1.5 text-left transition-colors ${
                  active === s.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </aside>

        <article className="prose prose-neutral max-w-none">
          <h1 className="text-4xl">{current.title}</h1>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/90">
            {current.body}
          </div>
        </article>
      </div>
    </PageShell>
  );
}

export default DocsPage;
