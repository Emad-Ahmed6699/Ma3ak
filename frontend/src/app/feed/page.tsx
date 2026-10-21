"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { useAuthStore } from "@/lib/auth-store";
import { Post } from "@/features/feed/types";
import { PostCard } from "@/features/feed/components/post-card";
import { CreatePostCard } from "@/features/feed/components/create-post-card";
import { FeedLeftSidebar } from "@/features/feed/components/feed-left-sidebar";
import { FeedRightSidebar } from "@/features/feed/components/feed-right-sidebar";

export default function FeedPage() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post-1",
      authorName: "Sarah Chen",
      authorHandle: "sarahc",
      role: "Moderator",
      timeAgo: "2 hours ago",
      content:
        "Welcome everyone to the official Ma3ak web platform! We've designed this space for calm, high-density academic and project collaboration. Feel free to introduce yourself below! 👇",
      likes: 34,
      replies: 12,
    },
    {
      id: "post-2",
      authorName: "Dr. Karim Mansour",
      authorHandle: "kmansour",
      role: "Admin",
      timeAgo: "4 hours ago",
      content:
        "Important announcement for Computer Science students: Project submissions for the distributed systems course are scheduled for next Monday. Let us know if you have any questions.",
      likes: 58,
      replies: 23,
    },
  ]);

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: "post-" + Date.now(),
      authorName: user?.fullName || "Community Member",
      authorHandle: user?.username || "guest",
      role: (user?.role as any) || "Member",
      timeAgo: "Just now",
      content,
      likes: 0,
      replies: 0,
    };

    setPosts([newPost, ...posts]);
  };

  const toggleLike = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Global Navigation */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Profile Navigation */}
          <FeedLeftSidebar postsCount={posts.length} />

          {/* Central Posts Feed */}
          <section className="lg:col-span-6 space-y-4">
            <CreatePostCard onPostCreated={handleCreatePost} />

            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onLikeToggle={toggleLike} />
              ))}
            </div>
          </section>

          {/* Right Trending & Recommendations */}
          <FeedRightSidebar />
        </div>
      </main>
    </div>
  );
}
