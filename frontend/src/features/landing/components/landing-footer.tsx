import React from "react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-outline-variant/30 py-8 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary-container flex items-center justify-center text-white text-[10px] font-bold">
            M
          </div>
          <span className="font-semibold text-on-surface">Ma3ak Social Network</span>
          <span>© 2026</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-on-surface transition-colors">Features</a>
          <a href="#community" className="hover:text-on-surface transition-colors">Community</a>
          <Link href="/auth?tab=login" className="hover:text-on-surface transition-colors">Sign In</Link>
          <Link href="/auth?tab=register" className="hover:text-on-surface transition-colors">Register</Link>
        </div>
      </div>
    </footer>
  );
}
