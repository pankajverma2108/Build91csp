import { Home, FileText, X } from "lucide-react";
import { NavLink } from "react-router-dom";
// import { useState } from "react";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const navItems = [
    { to: "/projects", label: "Home", icon: Home },
    { to: "/documents", label: "Documents", icon: FileText },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-64
          bg-white border-r-2 border-slate-300
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-slate-300">
          <div>
            <h1 className="text-xl font-bold text-foreground">Build91</h1>
            <p className="text-xs text-muted-foreground mt-1">Customer Portal</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
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

        {/* Footer */}
        <div className="p-4 border-t-2 border-slate-300">
          <div className="text-xs text-muted-foreground">
            <p className="font-medium">Project Name</p>
            <p className="truncate">Furniture Sourcing 2025</p>
          </div>
        </div>
      </aside>
    </>
  );
}
