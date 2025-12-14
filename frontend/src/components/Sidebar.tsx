import { Home, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const navItems = [
    { to: "/projects", label: "Home", icon: Home },
    { to: "/documents", label: "Documents", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-card border-r-2 border-slate-300 min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b-2 border-slate-300">
        <h1 className="text-xl font-bold text-foreground">Build91</h1>
        <p className="text-xs text-muted-foreground mt-1">Customer Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold border-2 border-blue-200"
                        : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
