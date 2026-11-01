const express = require("express");
const cors = require("cors");
require("dotenv").config();
if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is missing from environment variables!");
    process.exit(1);
}
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
    res.send("E-Commerce API is running!");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
