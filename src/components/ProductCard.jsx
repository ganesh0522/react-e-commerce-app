import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <h4 className="title">{product.title}</h4>

      <div className="meta">
        <span className="p-price">₹{product.price}</span>
        <span className="rating">⭐ {product.rating?.rate}</span>
      </div>

      <div className="card-actions">
        <Link to={`/product/${product.id}`} className="view-btn">
          View
        </Link>

        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
