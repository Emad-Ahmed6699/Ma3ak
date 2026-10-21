"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useAuthStore } from "@/lib/auth-store";
import { Sparkles, ArrowRight, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function LandingHeader() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 text-primary group">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-on-surface">
              Ma3ak
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Features
            </a>
            <a
              href="#community"
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Community
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              About
            </a>
            <a
              href="#guidelines"
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Guidelines
            </a>
          </nav>
        </div>

        {/* Right CTA / Auth Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/feed"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary text-sm font-semibold hover:bg-primary transition-all shadow-sm active:scale-95"
              >
                <span>Go to Feed</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => logout()}
                className="px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:text-error hover:bg-surface-container transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/auth?tab=login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-on-surface hover:text-primary hover:bg-surface-container transition-all"
              >
                Log in
              </Link>
              <Link
                href="/auth?tab=register"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary text-sm font-semibold hover:bg-primary transition-all shadow-sm active:scale-95"
              >
                <span>Sign up free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
