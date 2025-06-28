import React, { useEffect, useState } from "react";
import { useNotes, Note } from "../context/NotesContext";
import { useNavigate } from "@remix-run/react";

interface NoteFormProps {
  note?: Note;
  onSave?: (note: { title: string; content: string; category: string }) => void;
}

// PUBLIC_INTERFACE
export const NoteForm: React.FC<NoteFormProps> = ({ note, onSave }) => {
  const { categories, addCategory } = useNotes();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "");
  const [newCat, setNewCat] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setCategory(note?.category || "");
  }, [note]);

  const canSave = title.trim() && content.trim() && category.trim();

  return (
    <form
      className="w-full max-w-2xl mx-auto mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSave) return;
        onSave?.({ title: title.trim(), content: content.trim(), category: category.trim() });
      }}
    >
      <div className="mb-5">
        <label className="block mb-2 text-[#64748b] font-medium" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-[#2563eb] text-lg"
          placeholder="Title"
          minLength={1}
          maxLength={100}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-[#64748b] font-medium" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-[#2563eb] text-base min-h-[120px] resize-vertical"
          placeholder="Your note..."
          minLength={1}
          maxLength={2000}
          required
        ></textarea>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-[#64748b] font-medium" htmlFor="category">
          Category
        </label>
        <div className="flex gap-2">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded focus:outline-[#2563eb] min-w-[120px] bg-white"
            required
          >
            <option value="" disabled>
              Select
            </option>
            {categories
              .filter((cat) => cat)
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
          <input
            type="text"
            className="px-2 py-2 border border-gray-200 rounded min-w-[80px]"
            placeholder="Add new"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            maxLength={32}
          />
          <button
            type="button"
            className="bg-[#f59e42] text-white px-3 py-2 rounded font-medium hover:bg-[#f59e42]/90 transition text-sm"
            onClick={() => {
              if (newCat.trim() && !categories.includes(newCat.trim())) {
                addCategory(newCat.trim());
                setCategory(newCat.trim());
                setNewCat("");
              }
            }}
            disabled={!newCat.trim()}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 rounded text-[#64748b] font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white font-bold bg-[#2563eb] hover:bg-[#1743a2] disabled:opacity-60`}
          disabled={!canSave}
        >
          Save
        </button>
      </div>
    </form>
  );
};
