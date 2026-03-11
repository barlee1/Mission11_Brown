import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ConfirmPage.css";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cartItem";
import type { Book } from "../types/Book";

function ConfirmPage() {
  const navigate = useNavigate();
  const { title, bookId, price, images } = useParams();
  const location = useLocation();
  const state = location.state as { book?: Book } | null;
  const book = state?.book;
  const { addToCart } = useCart();

  const displayTitle = book?.title ?? title ?? "No Book Found";
  const numericPrice = book?.price ?? Number(price);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: book?.bookId ?? Number(bookId),
      title: displayTitle,
      price: numericPrice,
      subtotal: numericPrice,
      quantity: 1,
    };

    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <main className="confirm-page">
      <div className="confirm-card">
        <h2 className="confirm-title">{displayTitle}</h2>
        <div className="confirm-image-wrapper">
          <img
            className="confirm-image"
            src={book ? `/img/${book.images}` : `/img/${images}`}
            alt={displayTitle || "Book cover"}
          />
        </div>
        {book && (
          <ul className="confirm-details">
            <li>
              <strong>Author: </strong>
              {book.author}
            </li>
            <li>
              <strong>Publisher: </strong>
              {book.publisher}
            </li>
            <li>
              <strong>ISBN: </strong>
              {book.isbn}
            </li>
            <li>
              <strong>Classification/Category: </strong>
              {book.classification} / {book.category}
            </li>
            <li>
              <strong>Number of Pages: </strong>
              {book.pageCount}
            </li>
          </ul>
        )}
        <p className="confirm-price">Price: ${numericPrice.toFixed(2)}</p>
        <div className="confirm-actions">
          <button type="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="confirm-secondary-button"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default ConfirmPage;
