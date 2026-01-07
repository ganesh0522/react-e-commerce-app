import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Loader from "../components/Loader";

function Home({ searchText = "" }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    setLoading(true);

    fetchProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(() => {
        setError("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const result = products.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setFiltered(result);
    setCurrentPage(1);
  }, [searchText, products]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  if (loading) return <Loader />;

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="layout">
      <Filters products={products} setFiltered={setFiltered} />

      <div className="product-section">
        <h2>Products</h2>

        {filtered.length === 0 ? (
          <p className="empty-text">No products found 😕</p>
        ) : (
          <>
            <div className="product-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev
                </button>

                <span className="page-info">
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
