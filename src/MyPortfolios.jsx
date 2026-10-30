 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPortfolios() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("portfolios") || "[]");

    saved.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setPortfolios(saved);
  }, []);

  function deletePortfolio(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this portfolio?"
    );

    if (!confirmed) return;

    const updated = portfolios.filter(
      (portfolio) => portfolio.id !== id
    );

    localStorage.setItem("portfolios", JSON.stringify(updated));
    setPortfolios(updated);
  }

  function formatDate(date) {
    if (!date) return "Recently created";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-8 lg:px-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">
            WORKSPACE
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            My Portfolios
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage and organize all your portfolios in one place.
          </p>
        </div>

        <button
          onClick={() => navigate("/templates")}
          className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          + Create portfolio
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Total portfolios</p>
          <h2 className="mt-2 text-3xl font-bold">
            {portfolios.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Recently created</p>
          <h2 className="mt-2 text-3xl font-bold">
            {portfolios.length > 0 ? "1" : "0"}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Templates used</p>
          <h2 className="mt-2 text-3xl font-bold">
            {new Set(portfolios.map((p) => p.templateId)).size}
          </h2>
        </div>
      </div>

      {/* Portfolio list */}
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your projects</h2>

          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {portfolios.length} projects
          </span>
        </div>

        {portfolios.length === 0 ? (
          /* Empty state */
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl dark:bg-gray-800">
              📁
            </div>

            <h3 className="mt-6 text-xl font-bold">
              No portfolios yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              You haven't created any portfolios yet. Choose a
              template, add your details, and build your first
              professional portfolio.
            </p>

            <button
              onClick={() => navigate("/templates")}
              className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Create your first portfolio →
            </button>
          </div>
        ) : (
          /* Existing portfolios */
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex h-36 items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {portfolio.name?.charAt(0)?.toUpperCase() || "P"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Portfolio preview
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="truncate text-lg font-bold">
                    {portfolio.name || "Untitled Portfolio"}
                  </h3>

                  <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                    {portfolio.title || "No professional title added"}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {formatDate(portfolio.createdAt)}
                    </span>

                    <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800">
                      {portfolio.templateId || "Custom"}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() =>
                        navigate("/create-portfolio", {
                          state: { templateId: portfolio.templateId },
                        })
                      }
                      className="flex-1 rounded-lg bg-black px-3 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                    >
                      Open
                    </button>

                    <button
                      onClick={() => deletePortfolio(portfolio.id)}
                      className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-gray-700 dark:hover:bg-red-950"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
