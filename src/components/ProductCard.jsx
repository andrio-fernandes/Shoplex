import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.title}
      />

      <div className="product-content">

        <h3>{product.title}</h3>

        <p className="product-price">
          ₹{product.price}
        </p>

        <Link
          className="view-btn"
          to={`/products/${product._id}`}
        >
          View Details
        </Link>

      </div>

    </div>
  );
}