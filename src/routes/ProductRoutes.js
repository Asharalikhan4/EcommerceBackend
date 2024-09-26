import express from "express";
const router = express.Router();

import { createProduct, getAllProducts, getSingleProduct } from "../controllers/ProductControllers.js";

router.post("/create-product", createProduct);
router.get("/all-products", getAllProducts);
router.get("/:productId", getSingleProduct);

export default router;