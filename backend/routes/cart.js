
const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get user's cart
router.get("/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.params.userId
        }).populate("items.product");

        res.json(cart || { items: [] });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch cart"
        });
    }
});

// Add product to cart
router.post("/:userId", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({
            user: req.params.userId
        });

        if (!cart) {
            cart = new Cart({
                user: req.params.userId,
                items: []
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (item) {
            item.quantity += Number(quantity || 1);
        } else {
            cart.items.push({
                product: productId,
                quantity: Number(quantity || 1)
            });
        }

        await cart.save();

        res.json({
            message: "Product added to cart",
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
router.delete("/:userId/:productId", async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.params.userId
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
