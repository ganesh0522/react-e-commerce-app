import { useEffect, useState } from "react";

function Filters({ products, setFiltered }) {
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let data = [...products];

    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    data = data.filter((p) => p.price <= maxPrice);

    if (rating > 0) {
      data = data.filter((p) => p.rating?.rate >= rating);
    }

    setFiltered(data);
  }, [category, maxPrice, rating, products, setFiltered]);

  const resetFilters = () => {
    setCategory("all");
    setMaxPrice(1000);
    setRating(0);
    setFiltered(products);
  };

  return (
    <aside className="filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Max Price: ₹{maxPrice}</label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <div className="filter-group">
        <label>Minimum Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">All</option>
          <option value="3">3 ★ & above</option>
          <option value="4">4 ★ & above</option>
        </select>
      </div>

      <button className="reset-btn" onClick={resetFilters}>
        Clear All Filters
      </button>
    </aside>
  );
}

export default Filters;
