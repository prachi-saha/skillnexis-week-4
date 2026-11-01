import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>My E-Commerce Store</h2>

            <div>
                <Link to="/">Signup</Link>
                <Link to="/login">Login</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">My Cart</Link>
            </div>
        </nav>
    );
}

export default Navbar;
