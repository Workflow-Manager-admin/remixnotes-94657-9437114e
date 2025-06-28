import React from "react";
import { AppLayout } from "../components/AppLayout";
import { NotesProvider, useNotes } from "../context/NotesContext";
import { NoteForm } from "../components/NoteForm";
import { useParams } from "@remix-run/react";

// PUBLIC_INTERFACE
const EditNoteForm: React.FC = () => {
  const { noteId } = useParams();
  const { getNote, updateNote } = useNotes();
  const note = noteId ? getNote(noteId) : undefined;

  if (!note) {
    return <div className="pt-10 text-center text-[#64748b]">Note not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto pt-12">
      <h2 className="text-2xl font-bold mb-7 text-[#2563eb]">Edit Note</h2>
      <NoteForm
        note={note}
        onSave={({ title, content, category }) => {
          updateNote(note.id, { ...note, title, content, category });
          window.location.assign(`/notes/${note.id}`);
        }}
      />
    </div>
  );
};

export default function EditNoteRoute() {
  return (
    <NotesProvider>
      <AppLayout>
        <EditNoteForm />
      </AppLayout>
    </NotesProvider>
  );
}
