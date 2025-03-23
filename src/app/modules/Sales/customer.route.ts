import express from 'express';
import { SalesController } from './sales.controller';
const router = express.Router();

// Create: create customer
router.post("/create-sales", SalesController.createSales);

// Read (All): getAllCategories

// Read (By ID): getCategoryById

// Update: updateCategoryById

// Delete: deleteCategoryById


export const SalesRoutes = router;

