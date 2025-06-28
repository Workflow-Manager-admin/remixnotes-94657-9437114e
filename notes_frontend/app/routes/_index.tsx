import { AppLayout } from "../components/AppLayout";
import { NotesProvider } from "../context/NotesContext";
import { NoteList } from "../components/NoteList";
import { Outlet } from "@remix-run/react";

// PUBLIC_INTERFACE
export default function IndexRoute() {
  return (
    <NotesProvider>
      <AppLayout>
        {/* Nested outlets, e.g. for modals */}
        <Outlet />
        <section className="pt-3">
          <NoteList />
        </section>
      </AppLayout>
    </NotesProvider>
  );
}
