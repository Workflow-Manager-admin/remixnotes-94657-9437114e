import React, { createContext, useContext, useEffect, useState } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string; // Can also be "tag"
  createdAt: string;
  updatedAt: string;
}

type NoteInput = Omit<Note, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};

type Category = string;

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  categories: Category[];
  addCategory: (cat: string) => void;
  addNote: (input: NoteInput) => void;
  updateNote: (id: string, input: Omit<Note, "id" | "createdAt">) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return ctx;
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const fromLocal = typeof window !== "undefined"
      ? localStorage.getItem("notes")
      : null;
    return fromLocal ? JSON.parse(fromLocal) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const fromLocal = typeof window !== "undefined"
      ? localStorage.getItem("categories")
      : null;
    return fromLocal ? JSON.parse(fromLocal) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    // Update categories based on notes unless user has manually set
    const noteCategories = Array.from(
      new Set((notes || []).map((n) => n.category).filter(Boolean))
    );
    setCategories((prev) => Array.from(new Set([...prev, ...noteCategories])));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  function addCategory(cat: string) {
    setCategories((prev) =>
      prev.includes(cat) ? prev : [...prev, cat.trim()]
    );
  }

  function addNote(input: NoteInput) {
    const createdAt = new Date().toISOString();
    const newNote: Note = {
      ...input,
      id: crypto.randomUUID(),
      createdAt,
      updatedAt: createdAt,
      title: input.title.trim(),
      content: input.content.trim(),
      category: input.category,
    };
    setNotes((prev) => [newNote, ...prev]);
    addCategory(input.category);
  }

  function updateNote(id: string, input: Omit<Note, "id" | "createdAt">) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              ...input,
              updatedAt: new Date().toISOString(),
              title: input.title.trim(),
              content: input.content.trim(),
            }
          : n
      )
    );
    addCategory(input.category);
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function getNote(id: string) {
    return notes.find((n) => n.id === id);
  }

  const contextValue: NotesContextType = {
    notes,
    setNotes,
    categories,
    addCategory,
    addNote,
    updateNote,
    deleteNote,
    getNote,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
