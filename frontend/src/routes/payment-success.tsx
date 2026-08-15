import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "@/components/page-shell";
import { CheckCircle2, Download, Copy, ArrowRight, Check } from "lucide-react";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

const details = {
  invoice: "Website Development & Financial Integration",
  customer: "Dangote Ventures",
  amount: "$2,500.00",
  reference: "payAbPTX6l4TUbn",
  status: "Settled via ALATPay",
  paidOn: "15 Aug 2026",
};

function PaymentSuccessPage() {
  useEffect(() => {
    document.title = "Payment Successful — Kudispan AI";
  }, []);

  const [copied, setCopied] = useState(false);

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(details.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const downloadInvoice = () => {
    const body = `Kudispan AI — Payment Receipt
Invoice:    ${details.invoice}
Customer:   ${details.customer}
Amount:     ${details.amount}
Reference:  ${details.reference}
Status:     ${details.status}
Paid On:    ${details.paidOn}
`;
    const blob = new Blob([body], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${details.reference}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell>
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center"
        >
          <motion.div
            variants={scaleIn}
            className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary shadow-lg shadow-primary/10"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-6 text-center font-display text-4xl sm:text-5xl">
            Payment Successful
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-2 text-center text-sm text-muted-foreground">
            Your transaction has been verified and settled. A receipt has been issued to your customer.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <dl className="divide-y divide-border">
              <Row label="Invoice" value={details.invoice} />
              <Row label="Customer" value={details.customer} />
              <Row label="Amount" value={details.amount} strong />
              <Row label="Reference" value={details.reference} mono />
              <Row
                label="Status"
                value={
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {details.status}
                  </span>
                }
              />
              <Row label="Paid On" value={details.paidOn} />
            </dl>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row">
            <button
              onClick={downloadInvoice}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/95 transition-all"
            >
              <Download className="h-4 w-4" /> Download Receipt
            </button>
            <button
              onClick={copyReference}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy Reference"}
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-4">
            <Link
              to="/invoices"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <span>Back to Invoices Ledger</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  );
}

function Row({
  label,
  value,
  strong,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd
        className={`text-right text-sm ${strong ? "font-display text-2xl font-bold text-foreground" : "text-foreground"} ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export default PaymentSuccessPage;