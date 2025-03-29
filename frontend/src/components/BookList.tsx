import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookList.css";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  // how many entries per page
  const [pageSize, setPageSize] = useState<number>(5);
  // how many pages total
  const [pageNum, setPageNum] = useState<number>(1);
  // how many total pages are needed
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join(`&`);

      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
      );

      const data = await response.json();
      setBooks(data.bookList);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchBooks();
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
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
    </>
  );
}
export default BookList;
