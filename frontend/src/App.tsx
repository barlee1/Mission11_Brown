import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BooksPage from "./pages/BooksPage";
import ConfirmPage from "./pages/ConfirmPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AdminBooksPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route
            path="/Confirm/:title/:price/:bookId/:images"
            element={<ConfirmPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
