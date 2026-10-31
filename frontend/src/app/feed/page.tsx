"use client";

import React, { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Navbar } from "@/components/navbar";
import { api } from "@/lib/api";
import { ApiPost, Post } from "@/features/feed/types";
import { PostCard } from "@/features/feed/components/post-card";
import { CreatePostCard } from "@/features/feed/components/create-post-card";
import { FeedLeftSidebar } from "@/features/feed/components/feed-left-sidebar";
import { FeedRightSidebar } from "@/features/feed/components/feed-right-sidebar";

const formatTimeAgo = (createdAt: string) => {
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000)
  );

  if (elapsedSeconds < 60) return "Just now";
  if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`;
  if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`;
  return `${Math.floor(elapsedSeconds / 86400)}d ago`;
};

const mapApiPost = (post: ApiPost): Post => ({
  id: String(post.id),
  authorName: post.authorName,
  authorHandle: post.authorName.toLowerCase().replace(/\s+/g, ""),
  role: "Member",
  timeAgo: formatTimeAgo(post.createdAt),
  content: post.content,
  likes: 0,
  replies: 0,
});

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await api.get<ApiPost[]>("/Posts");
        setPosts(response.data.map(mapApiPost));
      } catch (error: unknown) {
        const message = isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message
          : undefined;
        setLoadError(message || "Unable to load posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, []);

  const handleCreatePost = async (content: string) => {
    const response = await api.post<ApiPost>("/Posts", {
      title: content.slice(0, 60),
      content,
    });
    setPosts((currentPosts) => [mapApiPost(response.data), ...currentPosts]);
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
              {isLoading && (
                <p className="text-sm text-on-surface-variant">Loading posts...</p>
              )}
              {loadError && (
                <p className="text-sm text-rose-500" role="alert">
                  {loadError}
                </p>
              )}
              {!isLoading && !loadError && posts.length === 0 && (
                <p className="text-sm text-on-surface-variant">
                  No posts yet. Be the first to share something.
                </p>
              )}
              {!loadError && posts.map((post) => (
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
