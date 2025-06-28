import { AppLayout } from "../components/AppLayout";
import { NotesProvider } from "../context/NotesContext";
import { NoteList } from "../components/NoteList";
import { useParams } from "@remix-run/react";

// PUBLIC_INTERFACE
export default function CategoryRoute() {
  const { cat } = useParams();
  const category = cat ? decodeURIComponent(cat) : undefined;
  return (
    <NotesProvider>
      <AppLayout>
        <section className="pt-3">
          <h2 className="font-bold text-xl mb-5 text-[#f59e42]">
            {category ? `Category: ${category}` : `All Notes`}
          </h2>
          <NoteList category={category} />
        </section>
      </AppLayout>
    </NotesProvider>
  );
}
