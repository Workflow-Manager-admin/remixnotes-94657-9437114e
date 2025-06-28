import React, { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { NavLink, useLocation } from "@remix-run/react";

// PUBLIC_INTERFACE
export const Sidebar: React.FC = () => {
  const { categories, setNotes, notes } = useNotes();
  const [newCat, setNewCat] = useState("");
  const location = useLocation();

  function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (newCat.trim() && !categories.includes(newCat)) {
      // Add as a dummy note for category creation (persistent across reloads) via the NotesContext logic
      setNotes((prev) => prev);
      localStorage.setItem(
        "categories",
        JSON.stringify([...categories, newCat.trim()])
      );
      setNewCat("");
    }
  }

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = notes.filter((n) => n.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="hidden sm:flex flex-col w-60 border-r bg-[#f9fafb] border-gray-100 min-h-0 min-w-0 py-6 px-2 sticky top-0">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-[#64748b] tracking-tight">
            Categories
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to={`/`}
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded ${
                  location.pathname === "/" || (isActive && location.pathname === "/")
                    ? "bg-[#2563eb] text-white"
                    : "hover:bg-[#2563eb]/10 text-[#2563eb]"
                } font-medium transition-colors`
              }
              end
            >
              All Notes 
              <span className="ml-2 text-xs text-[#64748b]">
                {notes.length}
              </span>
            </NavLink>
          </li>
          {categories.map((cat) =>
            cat ? (
              <li key={cat}>
                <NavLink
                  to={`/categories/${encodeURIComponent(cat)}`}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 rounded ${
                      isActive
                        ? "bg-[#f59e42] text-white"
                        : "hover:bg-[#f59e42]/20 text-[#f59e42]"
                    } font-medium transition-colors`
                  }
                >
                  {cat}
                  <span className="ml-2 text-xs text-[#64748b]">
                    {categoryCounts[cat] || 0}
                  </span>
                </NavLink>
              </li>
            ) : null
          )}
        </ul>
        {/* Add category form */}
        <form
          className="mt-3 flex gap-1"
          onSubmit={handleAddCategory}
          autoComplete="off"
        >
          <input
            className="flex-1 px-2 py-1 rounded border border-gray-200 bg-white focus:outline-[#2563eb] text-sm"
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Add category"
            aria-label="Add category"
            maxLength={32}
          />
          <button
            type="submit"
            className="rounded bg-[#f59e42] text-white px-2 py-1 text-sm font-medium hover:bg-[#f59e42]/90 transition"
            disabled={!newCat.trim()}
          >
            +
          </button>
        </form>
      </div>
    </aside>
  );
};
