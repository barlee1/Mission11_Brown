import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import BookList from "../components/BookList";
import "./BooksPage.css";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <main className="books-page">
      <aside className="books-page-sidebar">
        <CategoryFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </aside>
      <section className="books-page-content">
        <BookList selectedCategories={selectedCategories} />
      </section>
    </main>
  );
}

export default BooksPage;
