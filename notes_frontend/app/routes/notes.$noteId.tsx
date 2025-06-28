import React from "react";
import { AppLayout } from "../components/AppLayout";
import { NotesProvider, useNotes } from "../context/NotesContext";
import { NoteView } from "../components/NoteView";
import { useParams } from "@remix-run/react";

// PUBLIC_INTERFACE
const NoteDetail: React.FC = () => {
  const { noteId } = useParams();
  const { getNote } = useNotes();
  const note = noteId ? getNote(noteId) : undefined;

  if (!note) {
    return <div className="pt-10 text-center text-[#64748b]">Note not found.</div>;
  }
  return <NoteView note={note} />;
};

export default function NoteDetailRoute() {
  return (
    <NotesProvider>
      <AppLayout>
        <NoteDetail />
      </AppLayout>
    </NotesProvider>
  );
}
