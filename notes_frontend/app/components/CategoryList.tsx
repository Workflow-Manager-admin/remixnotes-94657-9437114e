import React from "react";
import { useNotes } from "../context/NotesContext";
import { Link } from "@remix-run/react";

// PUBLIC_INTERFACE
export const CategoryList: React.FC = () => {
  const { categories, notes } = useNotes();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="font-bold text-2xl mb-6 text-[#2563eb]">Categories</h2>
      <ul className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <li key={cat} className="flex flex-col items-center">
            <Link
              to={`/categories/${encodeURIComponent(cat)}`}
              className="px-4 py-2 rounded-full bg-[#f59e42] text-white font-medium hover:bg-[#f59e42]/90 transition text-sm"
            >
              {cat}
            </Link>
            <span className="mt-1 text-xs text-[#64748b]">
              {notes.filter((n) => n.category === cat).length} notes
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
