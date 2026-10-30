import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearSession } from "./api";

const menu = [
  { name: "Overview", path: "/dashboard", icon: "▦" },
  { name: "Templates", path: "/templates", icon: "▤" },
  { name: "My portfolios", path: "/my-portfolios", icon: "▣" },
  { name: "Settings", path: "/settings", icon: "⚙" },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "";
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    clearSession();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#20211f] md:flex">
      {/* Sidebar */}
      <aside className="border-b border-[#e8e4dc] bg-[#faf9f6] md:flex md:w-64 md:flex-col md:border-b-0 md:border-r">
        <div className="flex items-center justify-between p-4 md:p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-bold text-[#d8e8c8]">
              p
            </div>
            <span className="text-base font-semibold tracking-tight">
              portfolia.
            </span>
          </div>
          <button
            type="button"
            className="rounded-lg border border-[#e5e1d8] px-3 py-1.5 text-xs md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div className="hidden px-4 pb-3 md:block">
          <div className="rounded-2xl border border-[#e8e4dc] bg-white p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8e0d0] text-xs font-bold text-[#5a6b4a]">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{userName}</p>
                <p className="truncate text-[11px] text-[#8a8a80]">Free plan</p>
              </div>
            </div>
          </div>
        </div>

        <p className="hidden px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a0a098] md:block">
          Workspace
        </p>

        <nav
          className={`${
            mobileOpen ? "flex" : "hidden"
          } flex-col gap-1 px-3 pb-4 md:flex`}
        >
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#e9efdf] text-[#3d4a32]"
                    : "text-[#5c5c54] hover:bg-[#f0eee8]"
                }`
              }
            >
              <span className="text-base opacity-80">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto hidden p-4 md:block">
          <div className="rounded-2xl border border-[#e8e4dc] bg-[#eef3e6] p-4">
            <p className="text-sm font-semibold text-[#3d4a32]">
              Make it unforgettable.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#6b6b62]">
              Unlock premium templates and smarter tools.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 w-full rounded-xl border border-[#e5e1d8] bg-white py-2.5 text-xs font-semibold text-[#5c5c54] transition hover:bg-[#f6f4ef]"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between border-b border-[#e8e4dc] bg-[#faf9f6]/80 px-4 py-3 backdrop-blur md:hidden">
          <div>
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-xs text-[#8a8a80]">{userEmail}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-[#e5e1d8] px-3 py-1.5 text-xs font-semibold"
          >
            Sign out
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
