import React from "react";
import { useNotes } from "../context/NotesContext";
import { Link } from "@remix-run/react";

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

// PUBLIC_INTERFACE
export const NoteList: React.FC<{ category?: string }> = ({ category }) => {
  const { notes } = useNotes();

  const filtered = category
    ? notes.filter((n) => n.category === category)
    : notes;

  // Most recent first
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  if (!sorted.length) {
    return (
      <div className="text-center text-[#64748b] pt-12 sm:pt-20">
        <div className="text-2xl mb-4">🗒️</div>
        <div>No notes{category ? " in this category." : " yet."}</div>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
      {sorted.map((note) => (
        <li
          key={note.id}
          className="group flex flex-col h-full p-5 bg-white border border-gray-100 rounded-lg shadow hover:shadow-md transition-all min-h-[120px] relative"
        >
          <Link
            to={`/notes/${note.id}`}
            className="flex-1 block"
            tabIndex={0}
            aria-label={`Open note ${note.title}`}
          >
            <div className="font-semibold text-lg text-[#1a2533] truncate mb-2">
              {note.title || "Untitled"}
            </div>
            <div className="line-clamp-2 text-[#64748b] min-h-[40px]">
              {note.content}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-block bg-[#f9fafb] rounded px-2 py-0.5 text-xs text-[#2563eb] font-medium">
                {note.category}
              </span>
              <span className="text-xs text-[#64748b] ml-auto">
                {formatDate(note.updatedAt)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
