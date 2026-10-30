import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignin, saveSession } from "./api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await apiSignin({
        email: email.trim(),
        password,
      });
      saveSession(data);
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
      {/* Soft background wash */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#d8e8c8]/40 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#e8e0d0]/50 blur-3xl" />
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
          Welcome back to portfolia
        </p>
        <h1 className="mb-2 font-serif text-3xl font-medium leading-tight text-[#20211f]">
          Your next chapter <em className="not-italic text-[#5a6b4a]">starts here.</em>
        </h1>
        <p className="mb-8 text-sm text-[#6b6b62]">
          Sign in to continue building your personal portfolio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              className="w-full rounded-xl border border-[#e5e1d8] bg-[#faf9f6] px-4 py-3 text-sm outline-none transition focus:border-[#20211f] focus:bg-white"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#20211f] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
            {!busy && <span aria-hidden>→</span>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6b6b62]">
          New to Portfolia?{" "}
          <Link to="/signup" className="font-semibold text-[#5a6b4a] underline">
            Create an account
          </Link>
        </p>

        <p className="mt-4 text-center text-[11px] text-[#a0a098]">
          Connected to your Firebase backend API
        </p>
      </div>
    </div>
  );
}
