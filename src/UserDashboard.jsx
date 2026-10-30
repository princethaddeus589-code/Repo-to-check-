
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const name = localStorage.getItem("userName") || "User";

  let portfolios = [];

  try {
    const saved = JSON.parse(
      localStorage.getItem("portfolios") || "[]"
    );
    portfolios = Array.isArray(saved) ? saved : [];
  } catch {
    portfolios = [];
  }

  const published = portfolios.filter(
    (item) =>
      item.isPublished === true ||
      item.published === true ||
      item.status?.toLowerCase() === "published"
  ).length;

  const stats = [
    { label: "Total portfolios", value: portfolios.length },
    { label: "Published", value: published },
    { label: "Drafts", value: portfolios.length - published },
  ];

  const recent = [...portfolios].reverse().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f6f4ef] p-4 text-[#171717]   sm:p-7 lg:p-9">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-gray-500">
            YOUR WORKSPACE
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Dashboard
          </h1>
        </div>

        <Link
          to="/create-portfolio"
          className="rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-80 dark:bg-white dark:text-black"
        >
          + Create portfolio
        </Link>
      </header>

      <section className="mb-7 rounded-2xl bg-black p-6 text-white sm:p-8">
        <p className="text-xs text-gray-400">WELCOME BACK</p>
        <h2 className="mt-3 text-3xl font-bold">
          Hello, {name}.
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
          Your work deserves to be seen. Create a portfolio that
          presents your skills and experience professionally.
        </p>
        <Link
          to="/templates"
          className="mt-5 inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-gray-200"
        >
          Explore templates →
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white p-5  "
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Recent portfolios</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your latest projects.
            </p>
          </div>

          <Link
            to="/my-portfolios"
            className="text-sm font-semibold hover:underline"
          >
            View all →
          </Link>
        </div>

        {recent.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {recent.map((portfolio, index) => (
              <Link
                key={portfolio.id || portfolio.title || index}
                to="/create-portfolio"
                state={{ portfolio }}
                className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-black   dark:hover:border-white"
              >
                <h3 className="font-semibold">
                  {portfolio.title || portfolio.name || "Untitled portfolio"}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {portfolio.description || "Your portfolio project"}
                </p>
                <p className="mt-4 text-sm font-medium">
                  Open project →
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center dark:border-[#333] ">
            <h3 className="font-semibold">No portfolios yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create your first portfolio to get started.
            </p>
            <Link
              to="/create-portfolio"
              className="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold dark:border-[#444]"
            >
              Create your first portfolio
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
