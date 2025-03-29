import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BooksPage from "./pages/BooksPage"; // Make sure the import matches the correct component name
import ConfirmPage from "./pages/ConfirmPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route
            path="/Confirm/:title/:price/:bookId/:images"
            element={<ConfirmPage />}
          ></Route>
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
