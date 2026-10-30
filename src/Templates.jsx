
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "devfolio",
    name: "Devfolio",
    category: "Developer",
    description: "A modern, dark portfolio for software developers.",
    style: "dark",
    accent: "lime",
    tags: ["React", "JavaScript", "Projects"],
    label: "Popular",
  },
  {
    id: "minimal",
    name: "Monochrome",
    category: "Minimal",
    description: "Elegant typography and a clean editorial layout.",
    style: "minimal",
    accent: "black",
    tags: ["Personal brand", "About", "Work"],
    label: "Minimal",
  },
  {
    id: "creative",
    name: "Creative Studio",
    category: "Designer",
    description: "A bold visual portfolio for UI and graphic designers.",
    style: "creative",
    accent: "orange",
    tags: ["UI/UX", "Branding", "Case studies"],
    label: "Creative",
  },
  {
    id: "professional",
    name: "Executive",
    category: "Professional",
    description: "A polished portfolio for business and career growth.",
    style: "professional",
    accent: "blue",
    tags: ["Experience", "Achievements", "Contact"],
    label: "Professional",
  },
  {
    id: "photographer",
    name: "Visual Stories",
    category: "Photographer",
    description: "A gallery-led design for photographers and visual artists.",
    style: "photographer",
    accent: "white",
    tags: ["Photography", "Gallery", "Stories"],
    label: "Visual",
  },
  {
    id: "freelancer",
    name: "Freelance Pro",
    category: "Freelancer",
    description: "Show your services, previous work, and how clients can hire you.",
    style: "freelancer",
    accent: "green",
    tags: ["Services", "Projects", "Contact"],
    label: "Business",
  },
];

const categories = [
  "All",
  "Developer",
  "Minimal",
  "Designer",
  "Professional",
  "Photographer",
  "Freelancer",
];

function TemplatePreview({ template, large = false }) {
  const size = large ? "min-h-[430px]" : "min-h-[270px]";

  return (
    <div
      className={`relative overflow-hidden ${size} ${
        large ? "p-6 sm:p-10" : "p-5"
      } ${
        template.style === "dark"
          ? "bg-[#111318] text-white"
          : template.style === "minimal"
            ? "bg-[#f5f3ee] text-[#24231f]"
            : template.style === "creative"
              ? "bg-[#fff0e8] text-[#30221e]"
              : template.style === "professional"
                ? "bg-[#edf3fa] text-[#193451]"
                : template.style === "photographer"
                  ? "bg-[#171717] text-white"
                  : "bg-[#e9f5ed] text-[#163f30]"
      }`}
    >
      {/* Small website navigation */}
      <div className="flex items-center justify-between gap-3 border-b border-current/10 pb-4">
        <span className="text-xs font-black tracking-wide">
          {template.style === "dark"
            ? "alex.dev"
            : template.style === "minimal"
              ? "JANE DOE®"
              : template.style === "creative"
                ? "MIA STUDIO ✳"
                : template.style === "professional"
                  ? "MICHAEL CARTER"
                  : template.style === "photographer"
                    ? "NOIR / VISUALS"
                    : "YOUR NAME."}
        </span>

        <span className="text-[8px] font-medium opacity-60 sm:text-[9px]">
          {template.style === "dark"
            ? "ABOUT  WORK  CONTACT"
            : template.style === "minimal"
              ? "SELECTED WORK — 2026"
              : template.style === "creative"
                ? "WORK  ABOUT  CONTACT"
                : template.style === "professional"
                  ? "PROFILE  EXPERIENCE"
                  : template.style === "photographer"
                    ? "PORTFOLIO  STORIES"
                    : "SERVICES  PROJECTS"}
        </span>
      </div>

      {/* Developer design */}
      {template.style === "dark" && (
        <>
          <div className="mt-9">
            <p className="text-[9px] font-bold uppercase tracking-[2px] text-lime-400">
              Full-stack developer
            </p>
            <h3
              className={`mt-3 font-black leading-[0.98] tracking-tight ${
                large ? "text-5xl sm:text-6xl" : "text-4xl"
              }`}
            >
              Building
              <br />
              for the
              <br />
              <span className="text-lime-400">next web.</span>
            </h3>
            <p className="mt-4 max-w-[250px] text-[10px] leading-5 text-gray-400">
              I turn ideas into useful digital products with clean code and
              thoughtful design.
            </p>
            <div className="mt-5 inline-flex rounded-lg bg-lime-400 px-4 py-2.5 text-[9px] font-bold text-black">
              EXPLORE PROJECTS ↗
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {["React", "JavaScript", "Node.js"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 px-3 py-1.5 text-[9px] text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Minimal design */}
      {template.style === "minimal" && (
        <>
          <div className="mt-10">
            <p className="text-[9px] uppercase tracking-[3px]">
              Independent designer
            </p>
            <h3
              className={`mt-4 font-black leading-[0.9] tracking-tight ${
                large ? "text-6xl sm:text-7xl" : "text-5xl"
              }`}
            >
              Less,
              <br />
              but better.
            </h3>
            <p className="mt-5 max-w-[230px] text-[10px] leading-5 text-gray-600">
              Thoughtful design and meaningful experiences for brands with
              something to say.
            </p>
            <div className="mt-6 flex items-center justify-between border-y border-black/15 py-3 text-[9px] font-semibold">
              <span>SELECTED PROJECTS</span>
              <span>2024 — 2026 ↗</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-12 bg-[#d9cfc0]" />
              <div className="h-12 bg-[#b7b9aa]" />
              <div className="h-12 bg-[#e4d1c6]" />
            </div>
          </div>
        </>
      )}

      {/* Designer design */}
      {template.style === "creative" && (
        <>
          <div className="mt-9">
            <p className="text-[9px] font-bold uppercase tracking-[2px] text-orange-700">
              Art direction · Digital design
            </p>
            <h3
              className={`mt-4 font-black leading-[0.95] tracking-tight ${
                large ? "text-5xl sm:text-6xl" : "text-4xl"
              }`}
            >
              Ideas with
              <br />
              <span className="text-orange-600">feeling.</span>
            </h3>
            <p className="mt-4 max-w-[230px] text-[10px] leading-5 text-[#75625a]">
              Creating identities and digital experiences that people
              remember.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex h-20 items-end bg-[#e8a58b] p-3 text-[9px] font-bold">
              BRAND IDENTITY
            </div>
            <div className="flex h-20 items-end bg-[#d9d4bd] p-3 text-[9px] font-bold">
              DIGITAL DESIGN
            </div>
          </div>
        </>
      )}

      {/* Professional design */}
      {template.style === "professional" && (
        <>
          <div className="mt-9">
            <p className="text-[9px] font-semibold uppercase tracking-[2px] text-blue-700">
              Business consultant
            </p>
            <h3
              className={`mt-4 font-bold leading-tight ${
                large ? "text-4xl sm:text-5xl" : "text-3xl"
              }`}
            >
              Strategy meets
              <br />
              execution.
            </h3>
            <p className="mt-4 max-w-[250px] text-[10px] leading-5 text-slate-600">
              Helping teams solve complex problems and turn ambitious goals
              into measurable results.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                ["08+", "Years"],
                ["24", "Clients"],
                ["15", "Projects"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-blue-900/10 bg-white/70 p-3"
                >
                  <p className="text-base font-black">{number}</p>
                  <p className="mt-1 text-[8px] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Photographer design */}
      {template.style === "photographer" && (
        <>
          <div className="mt-9">
            <p className="text-[9px] uppercase tracking-[3px] text-gray-400">
              Photography & visual storytelling
            </p>
            <h3
              className={`mt-4 font-black leading-[0.95] tracking-tight ${
                large ? "text-5xl sm:text-6xl" : "text-4xl"
              }`}
            >
              Life,
              <br />
              through
              <br />
              my lens.
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="h-20 bg-[#5d625a]" />
            <div className="h-20 bg-[#a68b73]" />
            <div className="h-20 bg-[#c2b8a7]" />
          </div>
          <p className="mt-3 text-[9px] text-gray-400">
            PORTRAITS · TRAVEL · EDITORIAL
          </p>
        </>
      )}

      {/* Freelancer design */}
      {template.style === "freelancer" && (
        <>
          <div className="mt-9">
            <p className="text-[9px] font-bold uppercase tracking-[2px] text-green-700">
              Available for projects ✳
            </p>
            <h3
              className={`mt-4 font-black leading-[0.98] tracking-tight ${
                large ? "text-5xl sm:text-6xl" : "text-4xl"
              }`}
            >
              Good work.
              <br />
              Good people.
              <br />
              <span className="text-green-700">Great results.</span>
            </h3>
            <p className="mt-4 max-w-[240px] text-[10px] leading-5 text-green-950/70">
              Helping businesses grow through strategy, creativity, and
              execution.
            </p>
            <div className="mt-5 inline-flex rounded-full bg-green-800 px-4 py-2.5 text-[9px] font-bold text-white">
              LET'S WORK TOGETHER ↗
            </div>
          </div>
          <div className="mt-6 border-t border-green-900/15 pt-3 text-[9px] font-semibold">
            SERVICES · PROJECTS · TESTIMONIALS
          </div>
        </>
      )}

      <span className="absolute bottom-3 right-4 text-[8px] opacity-40">
        PORTFOLIO PREVIEW
      </span>
    </div>
  );
}

export default function Templates() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredTemplates =
    category === "All"
      ? templates
      : templates.filter((template) => template.category === category);

  function useTemplate(template) {
    sessionStorage.setItem("selectedTemplate", template.id);
    navigate("/create-portfolio", {
      state: { templateId: template.id },
    });
  }

  return (
    <main className="min-h-screen bg-[#f8f8f7] px-4 py-6 text-[#171717] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:border-black"
        >
          <span className="text-lg">←</span>
          Back to dashboard
        </button>

        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-gray-500">
              Your work deserves a great home
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Choose your template.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Start with a design that suits your work. Add your details,
              showcase your projects, and make it yours.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
            <span className="font-bold">{filteredTemplates.length}</span>
            <span className="text-gray-500"> designs to explore</span>
          </div>
        </header>

        {/* Filters */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                category === item
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Template cards */}
        <section className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <article
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
            >
              <div className="relative p-2">
                <div className="overflow-hidden rounded-xl">
                  <TemplatePreview template={template} />
                </div>

                <span className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/95 px-3 py-1.5 text-[10px] font-bold text-gray-800 shadow-sm">
                  {template.label}
                </span>
              </div>

              <div className="p-5 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {template.category}
                    </span>
                    <h2 className="mt-1 text-lg font-bold">
                      {template.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {template.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold">
                    Free
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 ring-1 ring-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelected(template)}
                    className="rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold transition hover:bg-gray-50"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => useTemplate(template)}
                    className="rounded-xl bg-black px-3 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Use template <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filteredTemplates.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="font-bold">No templates found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Try another category.
            </p>
          </div>
        )}

        {/* Preview modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6"
            onClick={() => setSelected(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.name} template preview`}
              className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {selected.category}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-black">
                    {selected.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {selected.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm text-black hover:bg-gray-50"
                >
                  Close ✕
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200">
                <TemplatePreview template={selected} large />
              </div>

              <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-xs leading-5 text-gray-500">
                  This is a design preview. Your information can be added in
                  the portfolio editor.
                </p>
                <button
                  onClick={() => useTemplate(selected)}
                  className="shrink-0 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Use this template →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
