import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Shoplex</h2>

      <div className="nav-links">
        {token && (
          <>
            <Link to="/">Home</Link>

            <Link to="/products">
              Products
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/cart">
              Cart
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>

          </>
        )}
      </div>
    </nav>
  );
}