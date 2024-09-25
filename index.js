import "dotenv/config";
import express from "express";
import chalk from "chalk";
import cors from "cors";
import DatabaseConnection from "./src/config/DatabaseConnection.js";

// Routes
import UserRoutes from "./src/routes/UserRoutes.js";
import ProductRoutes from "./src/routes/ProductRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:8080",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        // credentials: true,
        // set this true if u r sending token from cookie as it allows to send cookies otherwise cors policy will block cookies
    })
);

// Api's
app.get("/api-check", (req, res) => {
    res.status(200).json({ message: `Api is working fine at ${PORT}` });
});
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);

// Server
app.listen(PORT, () => {
    DatabaseConnection();
    console.log(chalk.blue.bgGreen.bold(`Server is running on port ${PORT}`));
});
