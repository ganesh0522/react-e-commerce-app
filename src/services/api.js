import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const fetchProductById = async (id) => {
  if (!id) throw new Error("Product ID is required");
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const fetchCategories = async () => {
  const res = await api.get("/products/categories");
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  if (!category) throw new Error("Category is required");
  const res = await api.get(`/products/category/${category}`);
  return res.data;
};

export default api;
