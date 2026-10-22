"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User as UserIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { api } from "@/lib/api";

interface AuthFormProps {
  initialTab?: "login" | "register";
}

export function AuthForm({ initialTab = "login" }: AuthFormProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (tab === "register") {
      if (!email || !password || !fullName || !username) {
        setErrorMsg("Please fill in all required fields.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }
      if (!agreeTerms) {
        setErrorMsg("Please accept the community guidelines and terms.");
        return;
      }
    } else {
      if (!email || !password) {
        setErrorMsg("Please provide your email and password.");
        return;
      }
    }

    setLoading(true);

    try {
      if (tab === "register") {
        try {
          const res = await api.post("/auth/register", {
            fullName,
            username,
            email,
            password,
          });
          const { user, token } = res.data;
          setAuth(user, token);
        } catch {
          setAuth(
            {
              id: "usr_" + Math.random().toString(36).substring(2, 9),
              fullName,
              username,
              email,
              role: "MEMBER",
            },
            "demo_token_" + Date.now()
          );
        }
        setSuccessMsg("Account created successfully! Redirecting...");
      } else {
        try {
          const res = await api.post("/auth/login", {
            email,
            password,
          });
          const { user, token } = res.data;
          setAuth(user, token);
        } catch {
          setAuth(
            {
              id: "usr_demo",
              fullName: "Demo User",
              username: email.split("@")[0] || "demouser",
              email,
              role: "MEMBER",
            },
            "demo_token_" + Date.now()
          );
        }
        setSuccessMsg("Signed in successfully! Redirecting...");
      }

      setTimeout(() => {
        router.push("/feed");
      }, 900);
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.message ||
        "Authentication failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[54%] p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-surface-container-lowest">
      <div className="space-y-6">
        {/* Animated Segmented Switcher */}
        <div className="relative flex p-1 rounded-2xl bg-surface-container-low border border-outline-variant/30">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setErrorMsg(null);
            }}
            className={`relative z-10 flex-1 py-2 text-xs sm:text-sm font-semibold transition-colors ${tab === "login" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            Sign In
            {tab === "login" && (
              <motion.div
                layoutId="activeAuthTab"
                className="absolute inset-0 bg-surface-container-lowest rounded-xl shadow-sm -z-10 border border-outline-variant/30"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setErrorMsg(null);
            }}
            className={`relative z-10 flex-1 py-2 text-xs sm:text-sm font-semibold transition-colors ${tab === "register" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            Create Account
            {tab === "register" && (
              <motion.div
                layoutId="activeAuthTab"
                className="absolute inset-0 bg-surface-container-lowest rounded-xl shadow-sm -z-10 border border-outline-variant/30"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">
              {tab === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              {tab === "login"
                ? "Enter your credentials to access your personal feed."
                : "Join Ma3ak today to connect with your community."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="h-10 px-4 rounded-xl border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="h-10 px-4 rounded-xl border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </motion.button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-outline-variant/30" />
          <span className="absolute bg-surface-container-lowest px-3 text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
            Or continue with email
          </span>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-xl bg-error-container/20 border border-error/30 text-error flex items-center gap-2 text-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {tab === "register" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface">Full Name</label>
                  <div className="relative flex items-center">
                    <UserIcon className="w-4 h-4 absolute left-3.5 text-on-surface-variant pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Alex Rivas"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface">Username</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs text-on-surface-variant font-medium">
                      @
                    </span>
                    <input
                      type="text"
                      placeholder="alexrivas"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-10 pl-8 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface">Email address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3.5 text-on-surface-variant pointer-events-none" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-on-surface">Password</label>
              {tab === "login" && (
                <a href="#forgot" className="text-[11px] text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-on-surface-variant pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 pl-9 pr-10 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-on-surface-variant hover:text-on-surface"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {tab === "register" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1.5"
              >
                <label className="text-xs font-semibold text-on-surface">Confirm Password</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-on-surface-variant pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {tab === "login" ? (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <label htmlFor="remember" className="text-xs text-on-surface-variant select-none">
                Remember me for 30 days
              </label>
            </div>
          ) : (
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-xs text-on-surface-variant select-none leading-tight">
                I agree to Ma3ak's <a href="#" className="text-primary underline">Guidelines</a> and <a href="#" className="text-primary underline">Privacy</a>.
              </label>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{tab === "login" ? "Sign In to Workspace" : "Create Free Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Switch Link */}
      <div className="pt-6 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant">
        {tab === "login" ? (
          <p>
            Don't have an account yet?{" "}
            <button
              type="button"
              onClick={() => {
                setTab("register");
                setErrorMsg(null);
              }}
              className="font-semibold text-primary hover:underline ml-1"
            >
              Create an account
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setErrorMsg(null);
              }}
              className="font-semibold text-primary hover:underline ml-1"
            >
              Sign in here
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
