"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

interface FeedLeftSidebarProps {
  postsCount: number;
}

export function FeedLeftSidebar({ postsCount }: FeedLeftSidebarProps) {
  const { user } = useAuthStore();

  return (
    <aside className="hidden lg:block lg:col-span-3 space-y-4">
      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="font-semibold text-on-surface text-sm">
              {user?.fullName || "Community Member"}
            </h3>
            <p className="text-xs text-on-surface-variant">
              @{user?.username || "guest"}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-outline-variant/20 flex justify-between text-center text-xs">
          <div>
            <div className="font-bold text-on-surface">128</div>
            <div className="text-on-surface-variant text-[11px]">Following</div>
          </div>
          <div>
            <div className="font-bold text-on-surface">342</div>
            <div className="text-on-surface-variant text-[11px]">Followers</div>
          </div>
          <div>
            <div className="font-bold text-on-surface">{postsCount}</div>
            <div className="text-on-surface-variant text-[11px]">Posts</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-xs">
        <div className="font-semibold text-on-surface flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Community Principles</span>
        </div>
        <p className="text-on-surface-variant leading-relaxed">
          Keep conversations constructive, respectful, and focused. Avoid spam and algorithmic clutter.
        </p>
      </div>
    </aside>
  );
}
