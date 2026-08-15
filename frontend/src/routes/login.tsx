import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "@/components/page-shell";
import { login } from "@/api/auth";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Lock, Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;

  const [formData, setFormData] = useState({
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
      const data = await login(formData);
      localStorage.setItem("access", data.access);
      navigate("/chat");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Sign in — Kudispan AI";
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
            <h1 className="font-display text-4xl sm:text-5xl">Welcome back.</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your AI financial workspace.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-7 shadow-xl shadow-primary/5 backdrop-blur-sm"
          >
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-xs font-medium text-primary border border-primary/20"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{message}</span>
              </motion.div>
            )}

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
                Email address
              </label>
              <div className="relative mt-1.5">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-primary transition-all focus:border-primary focus:ring-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <a href="#forgot" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1.5">
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-primary transition-all focus:border-primary focus:ring-2"
                />
              </div>
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
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign in to workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p variants={fadeUp} className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create free account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </PageShell>
  );
}

export default LoginPage;
