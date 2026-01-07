import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const isInCart = cart.some((item) => item.id === Number(id));

  useEffect(() => {
    setLoading(true);

    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="error-text">{error}</p>;
  if (!product) return null;

  return (
    <div className="details-page">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="details">
        <div className="details-image">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>

        <div className="details-info">
          <h2>{product.title}</h2>

          {product.rating && (
            <p className="rating">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <h3 className="price">₹{product.price}</h3>

          <p className="description">{product.description}</p>

          <div className="qty-controls">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          {!isInCart ? (
            <button
              className="add-cart-btn"
              onClick={() => addToCart({ ...product, quantity })}
            >
              Add to Cart
            </button>
          ) : (
            <p className="in-cart">✅ Already in cart</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
