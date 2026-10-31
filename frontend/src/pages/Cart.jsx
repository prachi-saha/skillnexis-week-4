import React, { useEffect, useState } from "react";
import API from "../api";

function Cart() {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) {
                setMessage("Please login to view your cart.");
                return;
            }

            try {
                const response = await API.get(`/cart/${userId}`);
                setCart(response.data.items || []);
            } catch (error) {
                setMessage("Unable to load cart.");
            }
        };

        fetchCart();
    }, [userId]);

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
                    </div>
                ))
            )}
        </div>
    );
}

export default Cart;
