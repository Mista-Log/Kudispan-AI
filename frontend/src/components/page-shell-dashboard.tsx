import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

/**
 * Shell for authenticated dashboard/app pages.
 * Intentionally has NO site footer — keeps the app feel clean.
 */
export function PageShellDashboard({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
