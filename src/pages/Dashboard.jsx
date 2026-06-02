import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>
          Welcome, {user?.name || "User"}
        </h1>

        <p>
          Manage your shopping experience
          from one place.
        </p>
      </div>

      <div className="dashboard-cards">

        <Link
          to="/products"
          className="card"
        >
          <h3>🛍 Products</h3>

          <p>
            Browse all available products.
          </p>
        </Link>

        <Link
          to="/cart"
          className="card"
        >
          <h3>🛒 Cart</h3>

          <p>
            View products added to your cart.
          </p>
        </Link>
        <Link
          to="/add-product"
          className="card"
        >
          <h3> Add Product</h3>

          <p>
            Create new products.
          </p>
        </Link>

      </div>

    </div>
  );
}