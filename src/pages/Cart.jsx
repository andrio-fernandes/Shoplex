import { useEffect, useState } from "react";
import api from "../services/api";
import "./Cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);

  const removeItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(
        items.filter(
          (item) => item._id !== id
        )
      );

      alert("Item removed successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to remove item");
    }
  };

  const validItems = items.filter(
    (item) => item.product
  );

  return (
    <div className="cart-page">

      <div className="cart-header">
        <div>
          <h1>My Cart</h1>
          <p>
            Review your selected items before checkout
          </p>
        </div>

        <div className="cart-count">
          {validItems.length} Items
        </div>
      </div>

      {validItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
          <p>
            Add some products to continue shopping
          </p>
        </div>
      ) : (
        <div className="cart-container">

          {validItems.map((item) => (
            <div
              className="cart-item"
              key={item._id}
            >
              <div className="cart-item-content">

                <h3 className="cart-item-title">
                  {item.product?.title}
                </h3>

                <p className="cart-item-price">
                  ₹{item.product?.price}
                </p>

              </div>

              <button
                onClick={() =>
                  removeItem(item._id)
                }
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}