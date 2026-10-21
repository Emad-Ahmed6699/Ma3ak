"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/features/auth/components/auth-card";

function AuthContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10">
      {/* Back to Home Link */}
      <div className="w-full max-w-5xl mb-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-colors"
        >
          ← Back to Ma3ak Home
        </Link>
        <span className="text-xs text-on-surface-variant">Stitch UI Authentication</span>
      </div>

      {/* Main Two-Column Auth Card */}
      <AuthCard initialTab={initialTab} />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-surface">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
