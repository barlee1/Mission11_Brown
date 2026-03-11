import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <button
      type="button"
      onClick={() => navigate("/cart")}
      aria-label={`View cart, total $${totalAmount}`}
      style={{
        backgroundColor: "#ffffff",
        color: "#bc7c7b",
        borderRadius: "999px",
        padding: "0.35rem 0.9rem",
        fontSize: "0.9rem",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        border: "none",
      }}
    >
      <span role="img" aria-hidden="true">
        🛒
      </span>
      <span>${totalAmount.toFixed(2)}</span>
    </button>
  );
};

export default CartSummary;
