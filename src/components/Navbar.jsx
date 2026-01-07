import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function Navbar({ onSearch }) {
  const { cartCount } = useCart();
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.className = theme === "light" ? "light" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        SG <span>Shop</span>
      </Link>

      <input
        className="search"
        placeholder="Search products..."
        value={search}
        onChange={handleSearch}
      />

      <div className="nav-links">
        <Link to="/cart">
          🛒 <span className="cart-count">{cartCount}</span>
        </Link>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
