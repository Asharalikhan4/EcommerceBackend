import express from "express";
const router = express.Router();

import { createProduct, getAllProducts } from "../controllers/ProductControllers.js";

router.post("/create-product", createProduct);
router.get("/all-products", getAllProducts);

export default router;