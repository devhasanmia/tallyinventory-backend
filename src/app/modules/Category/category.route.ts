import express from 'express';
import { CategoryController } from './category.controller';
const router = express.Router();

// Create: createCategory
router.post("/create-category", CategoryController.createCategory);

// Read (All): getAllCategories
router.get("/getAllCategories", CategoryController.getAllCategories);

// Read (By ID): getCategoryById
router.get("/getCategoryById/:id", CategoryController.getCategoryById);

// Update: updateCategoryById
router.put("/updateCategoryById/:id", CategoryController.updateCategoryById);

// Delete: deleteCategoryById
router.delete("/deleteCategoryById/:id", CategoryController.deleteCategoryById);


export const CategoryRoutes = router;

