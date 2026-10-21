export interface Post {
  id: string;
  authorName: string;
  authorHandle: string;
  role: "Admin" | "Moderator" | "Member";
  timeAgo: string;
  content: string;
  likes: number;
  replies: number;
  isLiked?: boolean;
  isSaved?: boolean;
}
