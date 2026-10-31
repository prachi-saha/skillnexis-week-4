import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
