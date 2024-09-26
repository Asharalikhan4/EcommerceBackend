import express from "express";
const router = express.Router();

import { createProduct, deleteProduct, getAllProducts, getSingleProduct } from "../controllers/ProductControllers.js";

router.post("/create-product", createProduct);
router.get("/all-products", getAllProducts);
router.get("/:productId", getSingleProduct);
router.delete("/:productId", deleteProduct);

export default router;