
import { useEffect, useState } from "react";

const sections = [
  { id: "profile", label: "Profile" },
  { id: "appearance", label: "Appearance" },
  { id: "preferences", label: "Preferences" },
  { id: "account", label: "Account" },
];

const readBool = (key, fallback) => {
  const value = localStorage.getItem(key);
  return value === null ? fallback : value === "true";
};

function getDark(mode) {
  if (mode === "dark") return true;
  if (mode === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function Settings() {
  const [active, setActive] = useState("profile");

  const [name, setName] = useState(
    () => localStorage.getItem("userName") || ""
  );

  const [email] = useState(
    () => localStorage.getItem("userEmail") || ""
  );

  const [appearance, setAppearance] = useState(
    () => localStorage.getItem("appearance") || "system"
  );

  const [dark, setDark] = useState(() =>
    getDark(localStorage.getItem("appearance") || "system")
  );

  const [message, setMessage] = useState("");

  const [prefs, setPrefs] = useState(() => ({
    emailUpdates: readBool("emailUpdates", true),
    showTips: readBool("showTips", true),
    compactMode: readBool("compactMode", false),
    reduceMotion: readBool("reduceMotion", false),
  }));

  // Apply appearance globally across the entire app.
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const applyTheme = () => {
      const isDark = getDark(appearance);

      setDark(isDark);

      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark
        ? "dark"
        : "light";

      document.documentElement.style.backgroundColor = isDark
        ? "#000000"
        : "#f7f7f7";

      document.body.style.backgroundColor = isDark
        ? "#000000"
        : "#f7f7f7";

      document.body.style.color = isDark
        ? "#ffffff"
        : "#171717";
    };

    localStorage.setItem("appearance", appearance);

    applyTheme();

    // Notify AppLayout so every page uses the selected theme.
    window.dispatchEvent(
      new CustomEvent("appearance-change", {
        detail: appearance,
      })
    );

    if (appearance === "system") {
      media.addEventListener("change", applyTheme);
    }

    return () => {
      media.removeEventListener("change", applyTheme);
    };
  }, [appearance]);

  // Save preferences and apply supported global classes.
  useEffect(() => {
    Object.entries(prefs).forEach(([key, value]) => {
      localStorage.setItem(key, String(value));
    });

    document.documentElement.classList.toggle(
      "compact-mode",
      prefs.compactMode
    );

    document.documentElement.classList.toggle(
      "reduce-motion",
      prefs.reduceMotion
    );

    window.dispatchEvent(
      new CustomEvent("preferences-change", {
        detail: prefs,
      })
    );
  }, [prefs]);

  const surface = dark
    ? "border-[#292929] bg-[#0b0b0b]"
    : "border-[#e7e7e7] bg-white";

  const muted = dark
    ? "text-[#999999]"
    : "text-[#737373]";

  const field = `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-current ${
    dark
      ? "border-[#303030] bg-black text-white placeholder:text-[#666]"
      : "border-[#dedede] bg-white text-black placeholder:text-[#999]"
  }`;

  function saveProfile(event) {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
      setMessage("Please enter your name.");
      return;
    }

    localStorage.setItem("userName", cleanName);
    setName(cleanName);
    setMessage("Profile saved successfully.");
  }

  function togglePreference(key) {
    setPrefs((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  const options = [
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
    { id: "system", label: "System" },
  ];

  const preferenceOptions = [
    [
      "emailUpdates",
      "Email updates",
      "Your preference for receiving updates.",
    ],
    [
      "showTips",
      "Helpful tips",
      "Show guidance where supported.",
    ],
    [
      "compactMode",
      "Compact layout",
      "Reduce spacing on supported pages.",
    ],
    [
      "reduceMotion",
      "Reduce motion",
      "Limit animations across supported elements.",
    ],
  ];

  return (
    <div
      className={`min-h-screen transition-colors ${
        dark
          ? "bg-black text-white"
          : "bg-[#f6f4ef] text-[#171717]"
      }`}
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Settings
            </h1>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              Manage your workspace and preferences.
            </p>
          </div>

          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              dark
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          >
            {(name || email || "U").charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="grid items-start gap-4 md:grid-cols-[175px_minmax(0,1fr)]">
          <nav
            className={`flex gap-1 overflow-x-auto rounded-xl border p-1.5 md:flex-col md:overflow-visible ${surface}`}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setActive(section.id);
                  setMessage("");
                }}
                className={`shrink-0 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition sm:text-sm ${
                  active === section.id
                    ? dark
                      ? "bg-white text-black"
                      : "bg-black text-white"
                    : `${muted} hover:bg-black/5 dark:hover:bg-white/10`
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <section className={`min-w-0 rounded-xl border ${surface}`}>
            {active === "profile" && (
              <div className="p-4 sm:p-5">
                <h2 className="text-sm font-semibold">
                  Personal information
                </h2>

                <p className={`mt-1 text-xs ${muted}`}>
                  Update your display name and account information.
                </p>

                <form
                  onSubmit={saveProfile}
                  className="mt-5 max-w-lg space-y-4"
                >
                  <div>
                    <label
                      htmlFor="setting-name"
                      className="mb-1.5 block text-xs font-medium"
                    >
                      Display name
                    </label>

                    <input
                      id="setting-name"
                      className={field}
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setMessage("");
                      }}
                      placeholder="Your name"
                      autoComplete="name"
                      maxLength={60}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="setting-email"
                      className="mb-1.5 block text-xs font-medium"
                    >
                      Email address
                    </label>

                    <input
                      id="setting-email"
                      className={`${field} opacity-60`}
                      value={email}
                      readOnly
                    />

                    <p className={`mt-1.5 text-[11px] ${muted}`}>
                      Email changes are managed through your sign-in provider.
                    </p>
                  </div>

                  {message && (
                    <p
                      role="status"
                      className={`text-xs ${
                        message === "Profile saved successfully."
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white hover:opacity-80 dark:bg-white dark:text-black"
                  >
                    Save changes
                  </button>
                </form>
              </div>
            )}

            {active === "appearance" && (
              <div className="p-4 sm:p-5">
                <h2 className="text-sm font-semibold">
                  Appearance
                </h2>

                <p className={`mt-1 text-xs ${muted}`}>
                  Choose your workspace theme.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={appearance === option.id}
                      onClick={() => setAppearance(option.id)}
                      className={`rounded-lg border p-2 text-left transition ${
                        appearance === option.id
                          ? "border-current ring-1 ring-current"
                          : "border-current/10"
                      }`}
                    >
                      <div
                        className={`mb-2 flex h-12 items-center justify-center rounded-md border border-current/10 ${
                          option.id === "dark"
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {option.id === "system" ? "◐" : "Aa"}
                      </div>

                      <span className="text-xs font-medium">
                        {option.label}
                      </span>

                      <span className={`mt-1 block text-[10px] ${muted}`}>
                        {appearance === option.id
                          ? "Selected ✓"
                          : option.id === "dark"
                            ? "Pure black"
                            : option.id === "system"
                              ? "Device setting"
                              : "White theme"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {active === "preferences" && (
              <div className="p-4 sm:p-5">
                <h2 className="text-sm font-semibold">
                  Preferences
                </h2>

                <p className={`mt-1 text-xs ${muted}`}>
                  Customize your workspace experience.
                </p>

                <div className="mt-3">
                  {preferenceOptions.map(
                    ([key, label, description]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-3 border-b border-current/10 py-3 last:border-0"
                      >
                        <div>
                          <p className="text-xs font-medium">
                            {label}
                          </p>

                          <p className={`mt-1 text-[11px] ${muted}`}>
                            {description}
                          </p>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={prefs[key]}
                          aria-label={label}
                          onClick={() => togglePreference(key)}
                          className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                            prefs[key]
                              ? dark
                                ? "bg-white"
                                : "bg-black"
                              : "bg-gray-300 dark:bg-gray-700"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                              prefs[key]
                                ? `left-[18px] ${
                                    dark ? "bg-black" : "bg-white"
                                  }`
                                : "left-0.5 bg-white"
                            }`}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {active === "account" && (
              <div className="p-4 sm:p-5">
                <h2 className="text-sm font-semibold">
                  Account details
                </h2>

                <p className={`mt-1 text-xs ${muted}`}>
                  Your current workspace information.
                </p>

                <div className="mt-4 divide-y divide-current/10">
                  {[
                    ["Name", name || "Not set"],
                    ["Email", email || "Not set"],
                    [
                      "Theme",
                      appearance === "system"
                        ? `System (${dark ? "Dark" : "Light"})`
                        : appearance === "dark"
                          ? "Dark"
                          : "Light",
                    ],
                    ["Preferences storage", "This browser"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between"
                    >
                      <span className={`text-xs ${muted}`}>
                        {label}
                      </span>

                      <span className="break-all text-xs font-medium sm:text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <footer className={`mt-5 text-[11px] ${muted}`}>
          Portfolify · Workspace settings
        </footer>
      </div>
    </div>
  );
}
