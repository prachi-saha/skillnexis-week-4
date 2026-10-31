import React, { useEffect, useState } from "react";
import API from "../api";

function Products() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get("/products");
                setProducts(response.data);
            } catch (error) {
                setMessage("Unable to load products.");
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-container">
            <h2>Our Products</h2>

            <p>{message}</p>

            <div className="product-list">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ₹{product.price}</p>
                        <p>Stock: {product.stock}</p>
                    </div>
                ))}
            </div>

            {products.length === 0 && !message && (
                <p>No products available yet.</p>
            )}
        </div>
    );
}

export default Products;
