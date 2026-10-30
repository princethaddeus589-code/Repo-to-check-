import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup, apiSignin, saveSession } from "./api";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await apiSignup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      // Auto sign-in after successful registration
      try {
        const session = await apiSignin({
          email: email.trim(),
          password,
        });
        saveSession(session);
      } catch {
        // If auto login fails, still send user to login
        navigate("/login", { replace: true });
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot reach the backend. Start the API server or set VITE_API_URL."
          : err.message
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f6f4ef] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-[#d8e8c8]/40 blur-3xl" />
        <div className="absolute bottom-8 left-8 h-64 w-64 rounded-full bg-[#e8e0d0]/50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl border border-[#e8e4dc] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-[#d8e8c8]">
            p
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#20211f]">
            portfolia.
          </span>
        </div>

        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8a8a80]">
          Get started
        </p>
        <h1 className="mb-2 font-serif text-3xl font-medium leading-tight text-[#20211f]">
          Create your workspace.
        </h1>
        <p className="mb-8 text-sm text-[#6b6b62]">
          Build a portfolio that feels like you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#20211f]">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
              required
              className="w-full rounded-xl border border-[#e5e1d8] bg-[#faf9f6] px-4 py-3 text-sm outline-none transition focus:border-[#20211f] focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#20211f]">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-[#e5e1d8] bg-[#faf9f6] px-4 py-3 text-sm outline-none transition focus:border-[#20211f] focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#20211f]">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-[#e5e1d8] bg-[#faf9f6] focus-within:border-[#20211f] focus-within:bg-white">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                className="w-full bg-transparent px-4 py-3 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="px-3 text-xs font-medium text-[#8a8a80]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[#20211f] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
          >
            {busy ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6b6b62]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#5a6b4a] underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
