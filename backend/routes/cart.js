const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get user's cart
router.get("/", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        res.json(cart || { items: [] });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch cart"
        });
    }
});

// Add product to cart
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const amount = Number(quantity || 1);

        if (!productId || !Number.isInteger(amount) || amount < 1) {
            return res.status(400).json({
                message: "Invalid product or quantity"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: []
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        const newQuantity = item
            ? item.quantity + amount
            : amount;

        if (newQuantity > product.stock) {
            return res.status(400).json({
                message: "Not enough stock available"
            });
        }

        if (item) {
            item.quantity = newQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: amount
            });
        }

        await cart.save();

        res.json({
            message: "Product added to cart successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to add product",
            error: error.message
        });
    }
});

// Remove product from cart
router.delete("/:productId", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();

        res.json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to remove product"
        });
    }
});

module.exports = router;
