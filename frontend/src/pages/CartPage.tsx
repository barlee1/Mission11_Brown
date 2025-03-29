import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item: CartItem) => (
                <li key={item.bookId}>
                  {item.title} : ${item.price}
                  <button onClick={() => removeFromCart(item.projectId)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: </h3>
        <button>Checkout</button>
        <button onClick={() => navigate("/")}>Continue Browsing</button>
      </div>
    </>
  );
}

export default CartPage;
