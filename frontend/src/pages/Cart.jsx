import React, { useEffect, useState } from "react";
import API from "../api";

function Cart() {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");

    const fetchCart = async () => {
        try {
            const response = await API.get("/cart");
            setCart(response.data.items || []);
        } catch (error) {
            setMessage("Please login to view your cart.");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeFromCart = async (productId) => {
        try {
            await API.delete(`/cart/${productId}`);
            setMessage("Product removed from cart.");
            fetchCart();
        } catch (error) {
            setMessage("Unable to remove product.");
        }
    };

    return (
        <div className="cart-container">
            <h2>My Shopping Cart</h2>

            <p>{message}</p>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((item) => (
                    <div key={item.product._id}>
                        <h3>{item.product.name}</h3>
                        <p>Price: ₹{item.product.price}</p>
                        <p>Quantity: {item.quantity}</p>

                        <button
                            onClick={() => removeFromCart(item.product._id)}
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Cart;
