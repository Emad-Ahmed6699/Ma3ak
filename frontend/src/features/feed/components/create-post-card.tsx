"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Smile, Send } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

interface CreatePostCardProps {
  onPostCreated: (content: string) => void;
}

export function CreatePostCard({ onPostCreated }: CreatePostCardProps) {
  const { user } = useAuthStore();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onPostCreated(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm space-y-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
          {user?.fullName?.charAt(0) || "U"}
        </div>
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a thought, update, or research insight..."
          className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none resize-none pt-2"
        />
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3">
        <div className="flex items-center gap-1 text-on-surface-variant">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-surface-container hover:text-primary transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-surface-container hover:text-primary transition-colors"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-on-primary text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-40"
        >
          <span>Post</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
