import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookList.css";
import Pagination from "./Pagination";
import { fetchBooks } from "../api/BooksApi";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  // how many entries per page
  const [pageSize, setPageSize] = useState<number>(5);
  // how many pages total
  const [pageNum, setPageNum] = useState<number>(1);
  // how many total pages are needed
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.bookList);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  return (
    <>
      <div className="card-container">
        {books.map((b) => (
          <div className="card" key={b.bookId}>
            <h3>{b.title}</h3>
            <div>
              <ul>
                <li>
                  <img src={`./img/${b.images}`} alt={b.images} />
                </li>
                <li>
                  <strong>Author: </strong> {b.author}
                </li>
                <li>
                  <strong>Publisher: </strong> {b.publisher}
                </li>
                <li>
                  <strong>ISBN: </strong>
                  {b.isbn}
                </li>
                <li>
                  <strong>Classification/Category: </strong>
                  {b.classification} / {b.category}
                </li>
                <li>
                  <strong>Number of Pages: </strong>
                  {b.pageCount}
                </li>
                <li>
                  <strong>Price: </strong>${b.price}
                </li>
              </ul>
              <button
                onClick={() =>
                  navigate(
                    `/Confirm/${encodeURIComponent(b.title)}/${b.price}/${b.bookId}/${b.images}`
                  )
                }
                className="buy-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </>
  );
}
export default BookList;
