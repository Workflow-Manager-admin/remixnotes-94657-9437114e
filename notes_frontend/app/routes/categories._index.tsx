import { AppLayout } from "../components/AppLayout";
import { NotesProvider } from "../context/NotesContext";
import { CategoryList } from "../components/CategoryList";

// PUBLIC_INTERFACE
export default function CategoriesIndexRoute() {
  return (
    <NotesProvider>
      <AppLayout>
        <CategoryList />
      </AppLayout>
    </NotesProvider>
  );
}
