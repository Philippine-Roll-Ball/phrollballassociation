
import { Bell } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "@/components/admin";
import { useAuth } from "@/hook/useAuth";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Dashboard",
    subtitle: "Welcome back! Here's your training overview.",
  },
  "/admin/generate-qr": {
    title: "Generate QR",
    subtitle: "Create unique QR codes for training materials.",
  },
  "/admin/members": {
    title: "Members",
    subtitle: "Manage member profiles and track progress.",
  },
  "/admin/events": {
    title: "Events",
    subtitle: "Manage your events.",
  },
  "/admin/gallery": {
    title: "Gallery",
    subtitle: "Manage your gallery.",
  },
  "/admin/news": {
    title: "News",
    subtitle: "Manage your news and announcements.",
  },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Manage your account settings.",
  },
};

const AdminLayout = () => {
  const location = useLocation();
  const { role } = useAuth();

  const meta = pageMeta[location.pathname] ?? {
    title: "Admin",
    subtitle: "",
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-heading font-bold text-foreground truncate">
                {meta.title}
              </h1>

              {meta.subtitle && (
                <p className="text-sm text-muted-foreground truncate">
                  {meta.subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-border">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-heading font-bold text-sm">
                  AD
                </div>

                <div className="hidden sm:block leading-tight">
                  <p className="text-sm font-medium text-foreground">
                    Administrator
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
