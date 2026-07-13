import { Moon, Sun } from "lucide-react";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useThemeStore } from "@/store/theme";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Evaluations", to: "/evaluations" },
  { label: "Reports", to: "/reports" },
  { label: "Settings", to: "/settings" },
];

export function AppLayout() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggle } = useThemeStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen">
      <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar-background p-4 md:flex">
        <Link to="/" className="mb-8 text-xl font-bold text-foreground">
          Sentinel AI
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-end border-b border-border px-6 gap-2">
          <Button variant="ghost" size="icon" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
