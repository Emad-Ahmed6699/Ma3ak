"use client";

import React from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from "lucide-react";
import { Post } from "../types";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface PostCardProps {
  post: Post;
  onLikeToggle: (id: string) => void;
}

export function PostCard({ post, onLikeToggle }: PostCardProps) {
  return (
    <SpotlightCard
      spotlightColor="rgba(99, 102, 241, 0.16)"
      className="p-5 space-y-3 transition-all glow-card hover:border-primary/40"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center font-bold text-primary text-sm">
            {post.authorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-on-surface">
                {post.authorName}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  post.role === "Admin"
                    ? "bg-primary/10 text-primary"
                    : post.role === "Moderator"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {post.role}
              </span>
            </div>
            <span className="text-xs text-on-surface-variant">
              @{post.authorHandle} • {post.timeAgo}
            </span>
          </div>
        </div>
        <button className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-on-surface leading-relaxed">
        {post.content}
      </p>

      {/* Interaction Row */}
      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-on-surface-variant text-xs">
        <button
          onClick={() => onLikeToggle(post.id)}
          className={`flex items-center gap-1.5 transition-colors ${
            post.isLiked ? "text-rose-500" : "hover:text-rose-500"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              post.isLiked ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span>{post.replies}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Bookmark className="w-4 h-4" />
          <span>Save</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </SpotlightCard>
  );
}
