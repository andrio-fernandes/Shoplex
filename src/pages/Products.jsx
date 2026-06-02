import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) {
    return (
      <div className="products-container">
        <div className="products-header-skeleton"></div>

        <div className="products-grid">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="product-skeleton"
            >
              <div className="skeleton-image"></div>

              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-price"></div>
                <div className="skeleton-btn"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-container">
      <h1 className="products-title">Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="products-search"
      />

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}