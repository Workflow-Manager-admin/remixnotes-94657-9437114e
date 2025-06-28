import React from "react";
import { useNotes, Note } from "../context/NotesContext";
import { useNavigate } from "@remix-run/react";

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString();
}

// PUBLIC_INTERFACE
export const NoteView: React.FC<{ note: Note }> = ({ note }) => {
  const { deleteNote } = useNotes();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 pt-3 pb-8">
      <div className="flex justify-between items-center mb-5">
        <div>
          <span className="inline-block bg-[#f9fafb] rounded px-2 py-0.5 text-sm text-[#2563eb] font-medium mr-2">
            {note.category}
          </span>
          <span className="text-xs text-[#64748b]">
            Last updated {formatDateTime(note.updatedAt)}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/notes/${note.id}/edit`)}
            className="px-3 py-1.5 bg-[#f59e42] text-white rounded text-sm font-medium hover:bg-[#f59e42]/90 transition"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to permanently delete this note?")
              ) {
                deleteNote(note.id);
                navigate("/", { replace: true });
              }
            }}
            className="px-3 py-1.5 bg-gray-100 text-[#64748b] rounded text-sm font-medium hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
      <h2 className="font-bold text-2xl mb-4 text-[#1a2533]">{note.title}</h2>
      <article className="prose prose-p:leading-snug text-[#1a2533]">
        {note.content?.split("\n").map((line, idx) => <p key={idx}>{line}</p>)}
      </article>
    </div>
  );
};
