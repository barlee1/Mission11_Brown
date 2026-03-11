import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import CartSummary from "./CartSummary";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")} role="button" aria-label="Go to home">
        <Logo />
        <span className="navbar-title">Next Chapter Co</span>
      </div>
      <nav className="navbar-links" aria-label="Main navigation">
        <NavLink to="/" className="navbar-link">
          Books
        </NavLink>
        <NavLink to="/cart" className="navbar-link">
          Cart
        </NavLink>
        <NavLink to="/admin" className="navbar-link">
          Admin
        </NavLink>
      </nav>
      <div className="navbar-right">
        <CartSummary />
      </div>
    </header>
  );
};

export default Navbar;

