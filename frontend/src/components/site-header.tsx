import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { isAuthenticated, logout } from "@/utils/auth";

export function SiteHeader() {
  const navigate = useNavigate();
  const authed = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {authed && <SidebarTrigger />}
          <Link to="/" className={`flex items-center gap-2 ${authed ? "md:hidden" : ""}`}>
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <img src={logo} alt="Logo" className="h-5 w-5 object-contain brightness-0 invert" />
            </span>
            <span className="font-display text-lg tracking-tight">Kudispan AI</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {authed ? (
            <button
              onClick={handleLogout}
              className="rounded-md border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

