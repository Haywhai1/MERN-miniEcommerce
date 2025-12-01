import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only
router.post("/", authAdmin, createProduct);
router.put("/:id", authAdmin, updateProduct);
router.delete("/:id", authAdmin, deleteProduct);

export default router;
