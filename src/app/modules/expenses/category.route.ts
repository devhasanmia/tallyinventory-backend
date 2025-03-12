import express from 'express';
import { ExpensesController } from './expenses.controller';
const router = express.Router();

// Create: create expenses
router.post("/create-expenses", ExpensesController.createExpenses);

// Read (All): getAllCategories

// Read (By ID): getCategoryById

// Update: updateCategoryById

// Delete: deleteCategoryById


export const ExpensesRoutes = router;

