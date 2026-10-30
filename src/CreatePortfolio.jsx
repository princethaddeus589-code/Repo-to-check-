
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const templates = {
  devfolio: "Devfolio",
  minimal: "Monochrome",
  creative: "Creative Studio",
  professional: "Executive",
  photographer: "Visual Stories",
  freelancer: "Freelance Pro",
};

const lightTemplateColors = {
  devfolio: "bg-lime-400 text-black",
  minimal: "bg-stone-200 text-stone-900",
  creative: "bg-orange-200 text-orange-950",
  professional: "bg-blue-100 text-blue-950",
  photographer: "bg-gray-950 text-white",
  freelancer: "bg-green-100 text-green-950",
};

function getIsDark() {
  const appearance = localStorage.getItem("appearance");

  if (appearance === "dark") return true;
  if (appearance === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function CreatePortfolio() {
  const navigate = useNavigate();
  const location = useLocation();

  const templateId =
    location.state?.templateId ||
    sessionStorage.getItem("selectedTemplate") ||
    "devfolio";

  const [dark, setDark] = useState(getIsDark);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: localStorage.getItem("userName") || "",
    title: "",
    bio: "",
    email: localStorage.getItem("userEmail") || "",
    skills: "",
    projectTitle: "",
    projectDescription: "",
    projectLink: "",
  });

  // Follow changes made in Settings.jsx.
  useEffect(() => {
    const updateTheme = () => {
      setDark(getIsDark());
    };

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also detect appearance changes in another tab.
    window.addEventListener("storage", updateTheme);

    // Handle System appearance changes.
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    systemTheme.addEventListener("change", updateTheme);

    updateTheme();

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", updateTheme);
      systemTheme.removeEventListener("change", updateTheme);
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function savePortfolio(e) {
    e.preventDefault();

    try {
      const portfolio = {
        ...form,
        id: crypto.randomUUID(),
        templateId,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(
        localStorage.getItem("portfolios") || "[]"
      );

      localStorage.setItem(
        "portfolios",
        JSON.stringify([...existing, portfolio])
      );

      setMessage("Portfolio saved successfully!");
    } catch {
      setMessage("Could not save your portfolio. Please try again.");
    }
  }

  const page = dark
    ? "bg-black text-white"
    : "bg-gray-50 text-gray-950";

  const panel = dark
    ? "border-gray-800 bg-gray-950 text-white"
    : "border-gray-200 bg-white text-gray-950";

  const field = dark
    ? "border-gray-700 bg-black text-white placeholder-gray-500"
    : "border-gray-200 bg-white text-gray-900 placeholder-gray-400";

  const muted = dark ? "text-gray-400" : "text-gray-500";

  const primary = dark
    ? "bg-white text-black hover:bg-gray-200"
    : "bg-black text-white hover:bg-gray-800";

  const previewColors = dark
    ? "border border-gray-800 bg-black text-white"
    : lightTemplateColors[templateId] || lightTemplateColors.devfolio;

  function renderPortfolio() {
    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    return (
      <div
        className={`min-h-[500px] overflow-hidden rounded-2xl p-7 transition-colors duration-200 sm:p-10 ${previewColors}`}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
          {templates[templateId] || "My Portfolio"}
        </p>

        <h2 className="mt-10 break-words text-4xl font-black sm:text-6xl">
          {form.name || "Your Name"}
        </h2>

        <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
          {form.title || "Your professional title"}
        </h3>

        <p className="mt-6 max-w-2xl whitespace-pre-wrap text-sm leading-7 opacity-80 sm:text-base">
          {form.bio || "Write a short introduction about yourself."}
        </p>

        {skills.length > 0 && (
          <div className="mt-8">
            <h4 className="font-bold">Skills</h4>

            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-current/20 px-3 py-1.5 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {(form.projectTitle || form.projectDescription) && (
          <div className="mt-10 border-t border-current/20 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-70">
              Featured project
            </h4>

            <h3 className="mt-3 break-words text-2xl font-bold">
              {form.projectTitle || "Project title"}
            </h3>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 opacity-80">
              {form.projectDescription}
            </p>

            {form.projectLink && (
              <a
                href={form.projectLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block underline underline-offset-4"
              >
                View project ↗
              </a>
            )}
          </div>
        )}

        {form.email && (
          <p className="mt-10 break-all border-t border-current/20 pt-5 text-sm">
            Contact: {form.email}
          </p>
        )}
      </div>
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-200 ${page}`}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => navigate("/templates")}
              className={`mb-5 rounded-xl border px-4 py-2 text-sm transition hover:opacity-80 ${panel}`}
            >
              ← Back to templates
            </button>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Create your portfolio
            </h1>

            <p className={`mt-2 ${muted}`}>
              Build a portfolio that showcases your best work.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className={`rounded-xl border px-5 py-3 font-semibold transition hover:opacity-80 ${panel}`}
          >
            {preview ? "← Edit details" : "Preview portfolio"}
          </button>
        </header>

        <div className={`mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 ${panel}`}>
          <div>
            <p className={`text-xs uppercase tracking-widest ${muted}`}>
              Selected template
            </p>

            <p className="mt-1 font-bold">
              {templates[templateId] || "Devfolio"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/templates")}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Change template
          </button>
        </div>

        {preview ? (
          <section>
            {renderPortfolio()}

            <button
              type="button"
              onClick={() => setPreview(false)}
              className={`mt-5 rounded-xl px-5 py-3 font-semibold ${primary}`}
            >
              Continue editing
            </button>
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.85fr]">
            <form
              onSubmit={savePortfolio}
              className={`space-y-6 rounded-2xl border p-5 sm:p-8 ${panel}`}
            >
              <div>
                <h2 className="text-xl font-bold">
                  Personal information
                </h2>
                <p className={`mt-1 text-sm ${muted}`}>
                  Tell people who you are.
                </p>
              </div>

              {[
                { name: "name", label: "Full name", placeholder: "Your name" },
                { name: "title", label: "Professional title", placeholder: "Frontend Developer" },
                { name: "email", label: "Contact email", placeholder: "you@example.com" },
              ].map((item) => (
                <div key={item.name}>
                  <label
                    htmlFor={item.name}
                    className="mb-2 block text-sm font-medium"
                  >
                    {item.label}
                  </label>

                  <input
                    id={item.name}
                    name={item.name}
                    value={form[item.name]}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    required={item.name === "name"}
                    type={item.name === "email" ? "email" : "text"}
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-500 ${field}`}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="bio" className="mb-2 block text-sm font-medium">
                  About you
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Introduce yourself and explain what you do..."
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-500 ${field}`}
                />
              </div>

              <div>
                <label htmlFor="skills" className="mb-2 block text-sm font-medium">
                  Skills
                </label>
                <input
                  id="skills"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, Tailwind CSS"
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-500 ${field}`}
                />
                <p className={`mt-2 text-xs ${muted}`}>
                  Separate each skill with a comma.
                </p>
              </div>

              <div className={`border-t pt-6 ${dark ? "border-gray-800" : "border-gray-200"}`}>
                <h2 className="text-xl font-bold">Featured project</h2>
                <p className={`mt-1 text-sm ${muted}`}>
                  Add a project you are proud of.
                </p>
              </div>

              <div>
                <label htmlFor="projectTitle" className="mb-2 block text-sm font-medium">
                  Project title
                </label>
                <input
                  id="projectTitle"
                  name="projectTitle"
                  value={form.projectTitle}
                  onChange={handleChange}
                  placeholder="My first web application"
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-500 ${field}`}
                />
              </div>

              <div>
                <label htmlFor="projectDescription" className="mb-2 block text-sm font-medium">
                  Project description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={form.projectDescription}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What does your project do?"
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-500 ${field}`}
                />
              </div>

              <div>
                <label htmlFor="projectLink" className="mb-2 block text-sm font-medium">
                  Project link
                </label>
                <input
                  id="projectLink"
                  name="projectLink"
                  type="url"
                  value={form.projectLink}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-500 ${field}`}
                />
              </div>

              {message && (
                <p
                  role="status"
                  className={`text-sm ${
                    message.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className={`rounded-xl border px-5 py-3 font-semibold ${panel}`}
                >
                  Preview
                </button>

                <button
                  type="submit"
                  className={`rounded-xl px-5 py-3 font-semibold ${primary}`}
                >
                  Save portfolio
                </button>
              </div>

              <p className={`text-xs ${muted}`}>
                Your portfolio is currently saved in this browser only.
              </p>
            </form>

            <aside className="min-w-0 lg:sticky lg:top-6">
              <div className="mb-3">
                <h2 className="font-bold">Live preview</h2>
                <p className={`mt-1 text-sm ${muted}`}>
                  Your changes appear here as you type.
                </p>
              </div>

              {renderPortfolio()}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
