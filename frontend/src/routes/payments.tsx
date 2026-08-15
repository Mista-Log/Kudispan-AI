import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Plus, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const initialTx = [
  { id: 1, name: "Payroll & Contractors — August", date: "Aug 14, 2026", amount: -18400, kind: "out" },
  { id: 2, name: "Mercer & Bell — Invoice Settlement", date: "Aug 12, 2026", amount: 4250, kind: "in" },
  { id: 3, name: "AWS Cloud Infrastructure", date: "Aug 10, 2026", amount: -842.31, kind: "out" },
  { id: 4, name: "Atlas Studio — Retainer Payment", date: "Aug 08, 2026", amount: 3500, kind: "in" },
  { id: 5, name: "Office Lease & Utilities", date: "Aug 01, 2026", amount: -3200, kind: "out" },
];

function PaymentsPage() {
  const [tx, setTx] = useState(initialTx);
  const [showModal, setShowModal] = useState(false);
  const [transferData, setTransferData] = useState({
    recipient: "",
    amount: "",
    account: "Operating (•••• 4521)",
  });

  useEffect(() => {
    document.title = "Payments & Treasury — Kudispan AI";
  }, []);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferData.recipient || !transferData.amount) return;

    const newTx = {
      id: Date.now(),
      name: transferData.recipient,
      date: "Just now",
      amount: -Math.abs(parseFloat(transferData.amount)),
      kind: "out" as const,
    };

    setTx([newTx, ...tx]);
    setShowModal(false);
    setTransferData({ recipient: "", amount: "", account: "Operating (•••• 4521)" });
  };

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
                Treasury & Disbursements
              </span>
              <h1 className="mt-1 font-display text-4xl sm:text-5xl">Payments</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Move capital across internal accounts, schedule vendor wires, and track cashflow.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/95 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>New Transfer</span>
            </motion.button>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-3">
            <Account name="Operating Account" number="•••• 4521" balance="$182,430.18" isPrimary />
            <Account name="Yield & Savings" number="•••• 7790" balance="$54,000.00" />
            <Account name="Tax & Reserve" number="•••• 0021" balance="$26,140.55" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl text-foreground">Recent Activity</h2>
              <span className="text-xs text-muted-foreground">Immutable audit log</span>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <ul className="divide-y divide-border">
                {tx.map((t) => (
                  <motion.li
                    key={t.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-xl ${
                          t.kind === "in" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {t.kind === "in" ? (
                          <ArrowDownLeft className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.date}</div>
                      </div>
                    </div>
                    <div
                      className={`tabular-nums text-sm font-semibold ${
                        t.amount > 0 ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {t.amount > 0 ? "+" : "-"}$
                      {Math.abs(t.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Transfer Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl z-10"
              >
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="font-display text-2xl">Disburse Transfer</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleTransfer} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Recipient / Vendor Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AWS Cloud Services"
                      value={transferData.recipient}
                      onChange={(e) =>
                        setTransferData({ ...transferData, recipient: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:border-primary focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Amount ($ USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="500.00"
                      value={transferData.amount}
                      onChange={(e) =>
                        setTransferData({ ...transferData, amount: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:border-primary focus:ring-2"
                    />
                  </div>

                  <div className="rounded-lg bg-primary/10 p-3 text-xs text-primary flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span>Protected by ALATPay 256-bit bank rails.</span>
                  </div>

                  <div className="mt-6 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-lg border border-border px-4 py-2 text-xs font-medium hover:bg-muted"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Confirm & Disburse
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

function Account({
  name,
  number,
  balance,
  isPrimary,
}: {
  name: string;
  number: string;
  balance: string;
  isPrimary?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className={`rounded-2xl border p-6 backdrop-blur-sm shadow-sm ${
        isPrimary ? "border-primary/50 bg-card ring-1 ring-primary/20" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground font-mono">{number}</div>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          Active
        </span>
      </div>
      <div className="mt-5 font-display text-3xl font-bold tabular-nums text-foreground">
        {balance}
      </div>
    </motion.div>
  );
}

export default PaymentsPage;
