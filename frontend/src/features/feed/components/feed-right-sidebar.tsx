"use client";

import React from "react";
import { TrendingUp, UserPlus } from "lucide-react";

export function FeedRightSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-3 space-y-4">
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
        <div className="flex items-center gap-2 text-on-surface font-semibold text-sm">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span>Trending Dispatches</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="p-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
            <div className="font-semibold text-on-surface">#FacultyOfScience</div>
            <div className="text-on-surface-variant text-[11px]">1.8k posts today</div>
          </div>
          <div className="p-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
            <div className="font-semibold text-on-surface">#DistributedSystems</div>
            <div className="text-on-surface-variant text-[11px]">940 posts</div>
          </div>
          <div className="p-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
            <div className="font-semibold text-on-surface">#Ma3akRelease</div>
            <div className="text-on-surface-variant text-[11px]">620 posts</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
        <div className="flex items-center gap-2 text-on-surface font-semibold text-sm">
          <UserPlus className="w-4 h-4 text-primary" />
          <span>Who to follow</span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-on-surface">Tariq Ziad</div>
              <div className="text-on-surface-variant text-[11px]">@tariq_z</div>
            </div>
            <button className="px-3 py-1 rounded-full bg-primary-container text-on-primary text-[11px] font-semibold hover:bg-primary transition-all">
              Follow
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-on-surface">Nouran Ali</div>
              <div className="text-on-surface-variant text-[11px]">@nouran_ai</div>
            </div>
            <button className="px-3 py-1 rounded-full bg-primary-container text-on-primary text-[11px] font-semibold hover:bg-primary transition-all">
              Follow
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
