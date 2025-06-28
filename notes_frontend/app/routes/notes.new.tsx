import React from "react";
import { AppLayout } from "../components/AppLayout";
import { NotesProvider, useNotes } from "../context/NotesContext";
import { NoteForm } from "../components/NoteForm";

// PUBLIC_INTERFACE
const NewNoteForm: React.FC = () => {
  const { addNote } = useNotes();
  return (
    <div className="max-w-2xl mx-auto pt-12">
      <h2 className="text-2xl font-bold mb-7 text-[#2563eb]">New Note</h2>
      <NoteForm onSave={(note) => {
        addNote(note);
        window.location.assign("/");
      }} />
    </div>
  );
};

export default function NewNoteRoute() {
  return (
    <NotesProvider>
      <AppLayout>
        <NewNoteForm />
      </AppLayout>
    </NotesProvider>
  );
}
