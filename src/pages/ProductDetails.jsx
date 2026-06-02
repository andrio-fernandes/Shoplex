import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/cart",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add to cart");
    }
  };

  if (!product) {
    return (
      <div className="product-details">

        <div className="product-image-skeleton"></div>

        <div className="product-info">

          <div className="title-skeleton"></div>

          <div className="desc-skeleton"></div>
          <div className="desc-skeleton short"></div>

          <div className="price-skeleton"></div>

          <div className="stock-skeleton"></div>

          <div className="button-skeleton"></div>

        </div>

      </div>
    );
  }

  return (
    <div className="product-details">

      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <div className="product-info">

        <h1 className="product-title">
          {product.title}
        </h1>

        <p className="product-description">
          {product.description}
        </p>

        <h2 className="product-price">
          ₹{product.price}
        </h2>

        <p className="product-stock">
          Stock: {product.stock}
        </p>

        <button
          className="add-cart-btn"
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}