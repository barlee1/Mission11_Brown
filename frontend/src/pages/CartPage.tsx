import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <div className="alert alert-warning text-center">
              Your cart is empty.
            </div>
          ) : (
            <ul className="list-group">
              {cart.map((item: CartItem) => (
                <li
                  key={item.bookId}
                  className="3 d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>{item.title}</strong> - ${item.price.toFixed(2)}{" "}
                    each
                    <br />
                    <span>Quantity: {item.quantity}</span>
                    <br />
                    <span>Subtotal: ${item.subtotal.toFixed(2)}</span>
                  </span>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.bookId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h3 className="text-center">
              Total: $
              {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </h3>
            <button className="btn btn-primary w-100 my-2">Checkout</button>
            <button
              className="btn btn-secondary w-100"
              onClick={() => navigate("/")}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
