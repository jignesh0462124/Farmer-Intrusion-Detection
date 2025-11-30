// src/pages/Signup.tsx
import React, { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

// ✅ Shared Supabase client
// If supabase.ts is in src/supabase/supabase.ts:
import { supabase } from "../../supabase/supabase";
// If your structure is different, adjust the path accordingly.

type View = "signup" | "login" | "reset";

const Signup: React.FC = () => {
  const [view, setView] = useState<View>("signup");

  // Signup state
  const [signupName, setSignupName] = useState("Rajesh Kumar");
  const [signupEmail, setSignupEmail] = useState("rajesh@farm.com");
  const [signupPassword, setSignupPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Reset password state
  const [resetEmail, setResetEmail] = useState("");

  // Shared UI state
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const switchView = (next: View) => {
    resetMessages();
    setView(next);
  };

  // 👉 Google OAuth login / signup
  const handleGoogleAuth = async () => {
    resetMessages();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong with Google sign-in.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 👉 Email + password signup
  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (signupPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!acceptTerms) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: signupName,
          },
          // Optional: confirmation / reset handler URL
          emailRedirectTo: `${window.location.origin}/reset-password`,
        },
      });

      if (error) throw error;

      // ✅ After signup: show a message, then switch to Login view
      setSuccess("Account created successfully. Please log in.");
      // Prefill login email with the signup email
      setLoginEmail(signupEmail);
      // Clear sensitive fields
      setSignupPassword("");
      setAcceptTerms(false);
      // Switch to login view
      setView("login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 👉 Email + password login
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      setSuccess("Logged in successfully.");
      // TODO: use useNavigate() from react-router-dom to redirect
      // const navigate = useNavigate();
      // navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 👉 Send reset password email
  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();

    if (!resetEmail.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess("Password reset link sent to your email.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send reset link.");
      }
    } finally {
      setLoading(false);
    }
  };

  const showGoogleButton = view === "signup" || view === "login";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div className="px-8 pt-8 pb-10">
          {/* Brand */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900">
              KhetGuard
            </span>
          </div>

          {/* Google button (for signup & login) */}
          {showGoogleButton && (
            <>
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-white">
                  <span className="text-lg leading-none text-sky-500">G</span>
                </span>
                <span>
                  {view === "signup"
                    ? "Sign up with Google"
                    : "Continue with Google"}
                </span>
              </button>

              <div className="my-6 flex items-center text-[11px] text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="px-3">Or continue with email</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
            </>
          )}

          {/* Login / Reset toggle pills */}
          {view !== "signup" && (
            <div className="mb-4 flex justify-center">
              <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
                <button
                  type="button"
                  onClick={() => switchView("login")}
                  className={`rounded-full px-4 py-1.5 ${
                    view === "login"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => switchView("reset")}
                  className={`rounded-full px-4 py-1.5 ${
                    view === "reset"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}

          {/* Signup form */}
          {view === "signup" && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-medium text-slate-700"
                >
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/0 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-medium text-slate-700"
                >
                  Work Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/0 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="mt-1.5 relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none ring-emerald-500/0 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Must be at least 8 characters.
                </p>
              </div>

              {/* Terms */}
              <div className="pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-medium text-emerald-600 hover:underline"
                    >
                      Terms
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-medium text-emerald-600 hover:underline"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
              </div>

              {/* Messages */}
              {error && (
                <p className="text-xs text-rose-500" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-xs text-emerald-600" role="status">
                  {success}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Processing..." : "Create Account"}
              </button>
            </form>
          )}

          {/* Login form */}
          {view === "login" && (
            <form onSubmit={handleLoginSubmit} className="mt-2 space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/0 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="mt-1.5 relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none ring-emerald-500/0 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="mt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => switchView("reset")}
                    className="text-[11px] font-medium text-emerald-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Messages */}
              {error && (
                <p className="text-xs text-rose-500" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-xs text-emerald-600" role="status">
                  {success}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Processing..." : "Login"}
              </button>
            </form>
          )}

          {/* Reset form */}
          {view === "reset" && (
            <form onSubmit={handleResetSubmit} className="mt-4 space-y-4">
              <p className="text-xs text-slate-600">
                Enter the email address associated with your account and we’ll
                send you a link to reset your password.
              </p>

              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-xs font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/0 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              {/* Messages */}
              {error && (
                <p className="text-xs text-rose-500" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-xs text-emerald-600" role="status">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          {/* Bottom text */}
          <div className="mt-6 text-center text-xs text-slate-500">
            {view === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchView("login")}
                  className="font-medium text-emerald-600 hover:underline"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchView("signup")}
                  className="font-medium text-emerald-600 hover:underline"
                >
                  Create one
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
