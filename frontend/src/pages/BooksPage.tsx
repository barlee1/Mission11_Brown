import React, { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import BookList from "../components/BookList";
import Logo from "../components/Logo";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <Logo />
      <div className="container mt-4">
        <div></div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
