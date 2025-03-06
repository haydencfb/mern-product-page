import express from "express";
import { createProduct, deleteOneProduct, getAllProducts, updateOneProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.delete("/:id", deleteOneProduct);
router.get("/", getAllProducts);
router.put("/:id", updateOneProduct);

export default router;