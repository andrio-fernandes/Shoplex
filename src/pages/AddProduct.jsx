import { useState } from "react";
import api from "../services/api";
import "./AddProduct.css";

export default function AddProduct() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/products",
                form,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Product Added Successfully"
            );

            setForm({
                title: "",
                description: "",
                price: "",
                image: "",
                category: "",
                stock: ""
            });

        } catch (error) {

            console.log(error);

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Failed To Add Product"
            );
        }
    };

    return (
        <div className="add-product-page">
            <div className="add-product-container">
                <h1>Add Product</h1>

                <form className="add-product-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                    />

                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}