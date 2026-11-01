const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch products"
        });
    }
});

// Get a single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
});

// Add a product (login required)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, description, price, stock, image } = req.body;

        if (!name || !description || price == null || stock == null) {
            return res.status(400).json({
                message: "Please provide all required product details"
            });
        }

        if (Number(price) < 0 || Number(stock) < 0) {
            return res.status(400).json({
                message: "Price and stock cannot be negative"
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            image
        });

        res.status(201).json({
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        res.status(400).json({
            message: "Unable to add product",
            error: error.message
        });
    }
});

module.exports = router;
