import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

// Create: createCategory
router.post("/create-product", ProductController.createProduct);
// Read (All): getAllCategories
// Read (By ID): getCategoryById
// Update: updateCategoryById
// Delete: deleteCategoryById


export const ProductRoutes = router;

