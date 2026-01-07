import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    cartCount,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty 🛒</h2>
        <p>Looks like you haven’t added anything yet.</p>
        <Link to="/" className="shop-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-items">
        <h2>Your Cart</h2>

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />

            <div className="cart-info">
              <h4>{item.title}</h4>
              <p className="price">₹{item.price}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <p className="subtotal">
                Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Items</span>
          <span>{cartCount}</span>
        </div>

        <div className="summary-row">
          <span>Total Price</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <hr />

        <h2>₹{totalPrice.toFixed(2)}</h2>

        <button className="checkout-btn">Proceed to Checkout</button>
        <button className="clear-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
