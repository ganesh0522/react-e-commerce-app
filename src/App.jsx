import { Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="app">
      <Navbar onSearch={setSearchText} />

      <main className="app-content">
        <Suspense fallback={<Loader text="Loading..." />}>
          <Routes>
            <Route path="/" element={<Home searchText={searchText} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<h2 className="not-found">Page Not Found</h2>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
