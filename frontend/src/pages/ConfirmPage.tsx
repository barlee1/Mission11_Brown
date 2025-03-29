import { useNavigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cartItem";

function ConfirmPage() {
  const navigate = useNavigate();
  const { title, bookId, price, images } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || "No Book Found",
      price: Number(price),
    };

    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <Logo />
      <h3>{title}</h3>

      <div>
        <img src={`/img/${images}`} alt={images} />
        <h5>Price: ${price}</h5>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default ConfirmPage;
