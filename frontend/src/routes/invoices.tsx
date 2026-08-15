import { useEffect, useState, type FormEvent } from "react";
import { PageShell } from "@/components/page-shell";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, X, Trash2, Receipt, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { getInvoices, createInvoice } from "@/api/invoices";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Row = { id: string; client: string; amount: number; status: string; due: string };

const statusTone: Record<string, string> = {
  Paid: "bg-primary/15 text-primary border-primary/20",
  Sent: "bg-accent text-accent-foreground border-accent-foreground/20",
  Overdue: "bg-destructive/15 text-destructive border-destructive/20",
  Draft: "bg-muted text-muted-foreground border-border",
};

type LineItem = { description: string; quantity: number; price: number };

function InvoicesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Invoices — Kudispan AI";

    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const invoices = await getInvoices();

        const formattedRows = invoices.map((invoice: any) => ({
          id: invoice.id,
          client: invoice.customer_name,
          amount: invoice.amount,
          status: invoice.status,
          due: new Date(invoice.due_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        }));

        setRows(formattedRows);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const totalOutstanding = rows
    .filter((r) => r.status === "Sent")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalPaid = rows
    .filter((r) => r.status === "Paid")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalOverdue = rows
    .filter((r) => r.status === "Overdue")
    .reduce((sum, r) => sum + r.amount, 0);

  const filteredRows = rows.filter(
    (r) =>
      r.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                Receivables & Invoicing
              </span>
              <h1 className="mt-1 font-display text-4xl sm:text-5xl">Invoices</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Issue branded invoices, track live settlement, and automate follow-ups.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/95 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>New Invoice</span>
            </motion.button>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-3">
            <Stat
              label="Outstanding Receivables"
              value={`$${totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            />
            <Stat
              label="Paid This Month"
              value={`$${totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            />
            <Stat
              label="Overdue Invoices"
              value={`$${totalOverdue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              tone={totalOverdue > 0 ? "destructive" : undefined}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-border px-5 py-3.5 bg-muted/20">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search invoices by client name, status, or invoice ID…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3.5">Invoice ID</th>
                    <th className="px-6 py-3.5">Client</th>
                    <th className="px-6 py-3.5">Amount</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muted-foreground">
                        Loading invoices...
                      </td>
                    </tr>
                  ) : filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muted-foreground">
                        <FileText className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                        No invoices found.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((r) => (
                      <tr key={r.id} className="transition-colors hover:bg-muted/30">
                        <td className="px-6 py-4 font-mono font-medium text-foreground">{r.id}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{r.client}</td>
                        <td className="px-6 py-4 tabular-nums font-semibold text-foreground">
                          ${r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                              statusTone[r.status] || statusTone["Draft"]
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{r.due}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <NewInvoiceDialog
            onClose={() => setOpen(false)}
            onCreate={(row) => {
              setRows((prev) => [row, ...prev]);
              setOpen(false);
            }}
            nextId={`INV-${String(242 + rows.length).padStart(4, "0")}`}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function NewInvoiceDialog({
  onClose,
  onCreate,
  nextId,
}: {
  onClose: () => void;
  onCreate: (row: Row) => void;
  nextId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"Draft" | "Sent">("Sent");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: 1, price: 0 }]);

  const total = items.reduce((s, it) => s + it.quantity * it.price, 0);

  const updateItem = (i: number, patch: Partial<LineItem>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const invoice = await createInvoice({
        customer_name: client,
        customer_email: email,
        amount: total,
        description: notes,
        due_date: dueDate || new Date().toISOString().split("T")[0],
        payment_reference: "",
      });

      onCreate({
        id: invoice.id || nextId,
        client: invoice.customer_name || client,
        amount: invoice.amount || total,
        status: invoice.status || status,
        due: new Date(invoice.due_date || dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create invoice.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl z-10"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/20">
          <div>
            <h2 className="font-display text-2xl">Create New Invoice</h2>
            <p className="text-xs text-muted-foreground">{nextId}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Client Name">
                <input
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Acme Studios Inc."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:border-primary focus:ring-2"
                />
              </Field>
              <Field label="Client Email">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="billing@acme.com"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:border-primary focus:ring-2"
                />
              </Field>
              <Field label="Due Date">
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:border-primary focus:ring-2"
                />
              </Field>
              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Draft" | "Sent")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:border-primary focus:ring-2"
                >
                  <option value="Sent">Sent (Issue Link)</option>
                  <option value="Draft">Draft</option>
                </select>
              </Field>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Line Items
                </label>
                <button
                  type="button"
                  onClick={() => setItems((p) => [...p, { description: "", quantity: 1, price: 0 }])}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Line Item
                </button>
              </div>
              <div className="space-y-2">
                {items.map((it, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2">
                    <input
                      placeholder="Service / Product Description"
                      required
                      value={it.description}
                      onChange={(e) => updateItem(i, { description: e.target.value })}
                      className="col-span-6 rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none ring-primary focus:border-primary focus:ring-2"
                    />
                    <input
                      type="number"
                      min={1}
                      required
                      placeholder="Qty"
                      value={it.quantity}
                      onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })}
                      className="col-span-2 rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none ring-primary focus:border-primary focus:ring-2"
                    />
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      required
                      placeholder="Price ($)"
                      value={it.price || ""}
                      onChange={(e) => updateItem(i, { price: Number(e.target.value) })}
                      className="col-span-3 rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none ring-primary focus:border-primary focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))}
                      disabled={items.length === 1}
                      className="col-span-1 grid place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-destructive disabled:opacity-30"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Field label="Notes & Payment Instructions">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Payment terms, thank-you note, or ALATPay reference details…"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:border-primary focus:ring-2 resize-none"
              />
            </Field>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/30 px-6 py-4">
            <div className="text-sm">
              <span className="text-muted-foreground text-xs uppercase tracking-wider">Total</span>{" "}
              <span className="ml-2 font-display text-2xl font-bold tabular-nums text-foreground">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/95 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Issue & Send Invoice"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "destructive" }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={`mt-2 font-display text-3xl font-bold tabular-nums ${
          tone === "destructive" ? "text-destructive" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </motion.div>
  );
}

export default InvoicesPage;
