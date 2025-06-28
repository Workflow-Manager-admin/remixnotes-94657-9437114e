import React from "react";
import { useNavigate } from "@remix-run/react";

// PUBLIC_INTERFACE
export const FloatingAddButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      title="Add Note"
      onClick={() => navigate("/notes/new")}
      className="fixed bottom-8 right-8 z-20 h-16 w-16 rounded-full bg-[#2563eb] shadow-lg flex items-center justify-center text-white text-3xl font-extrabold hover:bg-[#1743a2] active:scale-95 transition-transform"
      style={{ boxShadow: "0 8px 32px 0 rgba(37,99,235,0.12)" }}
      aria-label="Add new note"
    >
      +
    </button>
  );
};
