import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "@/components/page-shell";
import { signup } from "@/api/auth";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ArrowRight, Loader2, AlertCircle, ShieldCheck, CheckCircle2 } from "lucide-react";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    business_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(formData);
      navigate("/login", {
        state: {
          message: "Account created successfully! Please log in.",
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Create Account — Kudispan AI";
  }, []);

  return (
    <PageShell>
      <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md flex-col justify-center px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h1 className="font-display text-4xl sm:text-5xl">Create your account.</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              30 days free. Full access to AI banking, invoicing & payments.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-7 shadow-xl shadow-primary/5 backdrop-blur-sm"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-xs font-medium text-destructive border border-destructive/20"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full name
              </label>
              <input
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-primary transition-all focus:border-primary focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Business / Company name
              </label>
              <input
                name="business_name"
                required
                value={formData.business_name}
                onChange={handleChange}
                placeholder="Northwind Studio"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-primary transition-all focus:border-primary focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Work Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-primary transition-all focus:border-primary focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-primary transition-all focus:border-primary focus:ring-2"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/95 hover:shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Setting up your account...</span>
                </>
              ) : (
                <>
                  <span>Create free workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>

            <div className="pt-2 text-center text-xs text-muted-foreground">
              By continuing you agree to Kudispan's Terms of Service and Privacy Policy.
            </div>
          </motion.form>

          <motion.p variants={fadeUp} className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </PageShell>
  );
}

export default SignupPage;
