import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

// Create: createCategory
router.post("/create-product", ProductController.createProduct);
// Read (All): getAllProducts
router.get("/get-all-products", ProductController.getAllProducts);
// Read (By ID): getCategoryById
// Update: updateCategoryById
// Delete: deleteCategoryById


export const ProductRoutes = router;

