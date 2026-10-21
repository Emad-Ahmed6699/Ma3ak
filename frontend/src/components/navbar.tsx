"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { 
  Bell, 
  MessageSquare, 
  Compass, 
  Home, 
  Search,
  Sparkles
} from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-on-surface">
            Ma3ak
          </span>
        </Link>

        {/* Global Search */}
        <div className="hidden md:flex flex-1 max-w-md items-center relative">
          <Search className="w-4 h-4 absolute left-3 text-on-surface-variant pointer-events-none" />
          <input
            type="text"
            placeholder="Search posts, topics, people..."
            className="w-full h-9 pl-9 pr-4 rounded-full bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
              title="Home Feed"
            >
              <Home className="w-5 h-5" />
            </Link>
            <Link
              href="/explore"
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
              title="Explore"
            >
              <Compass className="w-5 h-5" />
            </Link>
            <Link
              href="/notifications"
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </Link>
            <Link
              href="/messages"
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>
          </nav>

          <div className="h-5 w-[1px] bg-outline-variant/40 mx-1" />

          <ThemeToggle />

          <Link
            href="/auth/login"
            className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-on-primary text-sm font-medium transition-all shadow-sm active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
