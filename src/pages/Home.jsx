import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const handleShopNow = () => {

    if (token) {
      navigate("/products");
    } else {
      navigate("/login");
    }

  };

  return (
    <div className="home">

      <section className="hero">

        <h1>
          Welcome to Shoplex
        </h1>

        <p>
          Discover quality products at affordable
          prices. Browse products, manage your cart,
          and enjoy a smooth shopping experience.
        
        </p>

        <button
          className="shop-btn"
          onClick={handleShopNow}
        >
          Shop Now
        </button>

      </section>

    </div>
  );
}