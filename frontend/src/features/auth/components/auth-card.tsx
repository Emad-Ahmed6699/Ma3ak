import React from "react";
import { AuthHeroBanner } from "./auth-hero-banner";
import { AuthForm } from "./auth-form";

interface AuthCardProps {
  initialTab?: "login" | "register";
}

export function AuthCard({ initialTab = "login" }: AuthCardProps) {
  return (
    <div className="w-full max-w-5xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 flex flex-col lg:flex-row overflow-hidden min-h-[640px]">
      {/* Brand Hero Banner */}
      <AuthHeroBanner />

      {/* Interactive Sign In & Register Form */}
      <AuthForm initialTab={initialTab} />
    </div>
  );
}
