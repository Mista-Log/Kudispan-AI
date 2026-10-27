import { useState, useEffect } from "react";
import { PageShell } from "@/components/page-shell";
import { translateText } from "@/api/translation";
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Check,
  Sparkles,
  Send,
  FileText,
} from "lucide-react";

const LANGUAGES = [
  "English",
  "Yoruba",
  "Swahili",
  "Nigerian Pidgin",
  "Hausa",
  "Igbo",
];

const PRESETS = [
  {
    label: "Invoice Notice",
    text: "Hello! Your invoice for website development is ready. Please find the payment link attached.",
  },
  {
    label: "Payment Confirmation",
    text: "Thank you for your payment. Your transaction has been confirmed successfully.",
  },
  {
    label: "Payment Reminder",
    text: "Kindly note that your payment is due tomorrow. Please let us know if you need any assistance.",
  },
];

export default function TranslatePage() {
  useEffect(() => {
    document.title = "Translator — Kudispan AI";
  }, []);

  const [fromLang, setFromLang] = useState("English");
  const [toLang, setToLang] = useState("Yoruba");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  const handleTranslate = async () => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (fromLang === toLang) {
      setError("Source and target languages must differ.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await translateText({
        text: trimmed,
        from_language: fromLang,
        to_language: toLang,
      });
      setTranslatedText(res.translated_text);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Translation failed. Please verify your Nkenne AI API key.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" /> Powered by Nkenne AI
            </div>
            <h1 className="mt-1 text-4xl">Business Translator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Translate invoices, client messages, and payment reminders into African languages.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1">
            <FileText className="h-3 w-3" /> Quick Samples:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setText(p.text);
                setError("");
              }}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs hover:bg-muted transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Translation Card */}
        <div className="mt-6 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          {/* Language Selector Bar */}
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-3">
            <div className="flex items-center gap-3">
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={swapLanguages}
                className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                title="Swap languages"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>

              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleTranslate}
              disabled={loading || !text.trim()}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? "Translating..." : "Translate"}
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Text Areas Grid */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Input Side */}
            <div className="p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Original Text ({fromLang})
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message, payment reminder, or invoice description here..."
                rows={8}
                className="mt-3 w-full resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
              />
              <div className="mt-2 text-right text-xs text-muted-foreground">
                {text.length} / 5000 chars
              </div>
            </div>

            {/* Output Side */}
            <div className="p-6 bg-muted/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Translation ({toLang})
                  </span>
                  {translatedText && (
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-primary" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="mt-3 min-h-[160px] text-sm leading-relaxed whitespace-pre-wrap">
                  {translatedText ? (
                    <p className="text-foreground font-medium">{translatedText}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      {loading
                        ? "Translating with Nkenne AI..."
                        : "Translated output will appear here."}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
