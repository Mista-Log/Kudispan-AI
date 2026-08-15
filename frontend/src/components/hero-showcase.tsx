import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Building2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import bankingImg from "@/assets/hero/banking-dashboard.jpg";
import commerceImg from "@/assets/hero/commerce-retail.jpg";
import businessImg from "@/assets/hero/business-strategy.jpg";
import paymentsImg from "@/assets/hero/mobile-payments.jpg";

interface ShowcaseSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  stat: string;
  statLabel: string;
  chipText: string;
  icon: typeof Building2;
  actionText: string;
}

const slides: ShowcaseSlide[] = [
  {
    id: "banking",
    category: "Banking & Treasury",
    title: "Autonomous Cash Flow & Multi-Account Banking",
    subtitle: "Real-time ledger sync across checking, savings, and operating accounts with zero manual entry.",
    image: bankingImg,
    stat: "$182,430.18",
    statLabel: "Live Operating Balance",
    chipText: "Auto-reconciled with 4 bank feeds",
    icon: Building2,
    actionText: "View balance ledger",
  },
  {
    id: "commerce",
    category: "Commerce & Checkout",
    title: "Instant Invoicing & Omnichannel Commerce",
    subtitle: "Issue smart payment links, track customer settlement, and eliminate unpaid invoices in one tap.",
    image: commerceImg,
    stat: "100% Settled",
    statLabel: "ALATPay Instant Link",
    chipText: "Invoice #INV-0241 ($4,250.00) paid",
    icon: CreditCard,
    actionText: "Create payment link",
  },
  {
    id: "strategy",
    category: "Strategic Insights",
    title: "Executive Intelligence & Runway Forecasting",
    subtitle: "Predict quarterly tax obligations, identify expense anomalies, and extend runway with AI analytics.",
    image: businessImg,
    stat: "18.5 Months",
    statLabel: "Forecasted Runway",
    chipText: "+14.2% Net Margin growth",
    icon: TrendingUp,
    actionText: "Analyze runway",
  },
  {
    id: "payments",
    category: "Global Transfers",
    title: "One-Sentence Vendor Transfers & Payroll",
    subtitle: "Disburse domestic and global supplier payments instantly with bank-grade confirmation safeguards.",
    image: paymentsImg,
    stat: "Instant Wire",
    statLabel: "Bank-Grade Encryption",
    chipText: "Vendor disbursement approved",
    icon: ShieldCheck,
    actionText: "Schedule transfer",
  },
];

export function HeroShowcase() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = slides[current];

  return (
    <div
      className="relative mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Category Pills Navigation */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        {slides.map((item, idx) => {
          const isActive = idx === current;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrent(idx)}
              className={`group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                  : "border border-border bg-card/80 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 transition-colors ${isActive ? "text-primary-foreground" : "text-primary"}`} />
              <span>{item.category}</span>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Card with Frame & Border Glow */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl backdrop-blur-sm">
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute -inset-px -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-70" />

        {/* Carousel Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9] lg:h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover object-center"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent md:from-background/90 md:via-background/30 md:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/30 hidden md:block" />
            </motion.div>
          </AnimatePresence>

          {/* Floating UI Badges on Top of Image */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10">
            {/* Top Row: Real-time Live Badge */}
            <div className="flex items-center justify-between">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <span>{slide.category}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary flex items-center gap-1 font-medium">
                  <Sparkles className="h-3 w-3" /> Live Assistant
                </span>
              </motion.div>

              {/* Navigation Arrows */}
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 p-1 backdrop-blur-md">
                <button
                  onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bottom Row: Content Overlay + Floating Data Card */}
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
              {/* Text Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${slide.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="text-2xl font-display leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
                    {slide.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Live Interactive Stat Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${slide.id}`}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="rounded-xl border border-border/80 bg-background/90 p-4 backdrop-blur-md shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {slide.statLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      <ArrowUpRight className="h-3 w-3" /> Active
                    </span>
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {slide.stat}
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs text-primary font-medium">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{slide.chipText}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress Bar Indicators */}
        <div className="grid grid-cols-4 border-t border-border/60 bg-card/60">
          {slides.map((item, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={`prog-${item.id}`}
                onClick={() => setCurrent(idx)}
                className="relative flex flex-col items-start px-4 py-3 text-left transition-colors hover:bg-muted/40"
              >
                <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                  {isActive && (
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{ duration: 5.5, ease: "linear" }}
                    />
                  )}
                </div>
                <span className="mt-2 hidden text-xs font-medium text-foreground/80 sm:inline-block truncate w-full">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
