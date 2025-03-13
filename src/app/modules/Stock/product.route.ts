import express from 'express';
import { StockController } from './stockPurchase.controller';
const router = express.Router();

// Create: createCategory
router.post("/stock-purchase", StockController.stockPurchase);
// Read (All): getAllCategories
// Read (By ID): getCategoryById
// Update: updateCategoryById
// Delete: deleteCategoryById


export const ProductRoutes = router;

