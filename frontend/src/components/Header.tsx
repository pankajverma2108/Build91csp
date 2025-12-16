import React, { useState } from 'react';
import { Bell, Menu, X, Home, FileText, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import logo from 'figma:asset/a4979a0e3ecc8e90fb62877f0725ebac4af10ff0.png';

export function Header() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notificationCount] = useState(2);

  const notifications = [
    { id: 1, title: 'Visa approved', time: '3d ago', isNew: true },
    { id: 2, title: 'Travel Documents need approval', time: '5d ago', isNew: true },
    { id: 3, title: 'Meeting Scheduled', time: '9d ago', isNew: false }
  ];

  const navItems = [
    { to: "/projects", label: "Home", icon: Home },
    { to: "/documents", label: "Documents", icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("customer_token");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="BUILD 91" className="h-6 md:h-8" />
            <div className="hidden sm:block">
              <h1 className="font-bold text-base md:text-lg text-slate-900">
                China Sourcing Portal
              </h1>
              <p className="text-xs text-muted-foreground">
                Project Management Dashboard
              </p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-slate-100 text-slate-900 border-2 border-slate-300"
                        : "text-muted-foreground hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors border-2 border-slate-300"
              >
                <Bell className="w-5 h-5 text-slate-900" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border-2 border-slate-300 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
                    <div className="p-4 border-b-2 border-slate-300">
                      <h3 className="font-bold text-slate-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer ${
                            notification.isNew ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm text-slate-900 font-medium flex-1">
                              {notification.title}
                              {notification.isNew && (
                                <span className="ml-2 inline-flex w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Logout Button - Desktop */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-colors border-2 border-slate-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-slate-900" />
            </button>

            {/* Menu - Mobile Only */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors border-2 border-slate-300"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setShowMenu(false)}
          />
          <div className="fixed top-[73px] left-0 right-0 bg-white border-b-2 border-slate-300 z-50 md:hidden shadow-lg">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-900 hover:bg-slate-100"
                      }`
                    }
                    onClick={() => setShowMenu(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
              
              {/* Logout in Mobile Menu */}
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-red-600 hover:bg-red-50 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
