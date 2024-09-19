import "dotenv/config";
import express from "express";
import chalk from "chalk";
import DatabaseConnection from "./src/config/DatabaseConnection.js";

// Routes
import UserRoutes from "./src/userRoutes/UserRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Api's
app.get("/api-check", (req, res) => {
    res.status(200).json({ message: `Api is working fine at ${PORT}`});
});
app.use("/api/v1/user", UserRoutes);

// Server
app.listen(PORT, () => {
    DatabaseConnection();
    console.log(chalk.blue.bgGreen.bold(`Server is running on port ${PORT}`));
});
