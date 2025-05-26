import express from 'express';
import { CustomerController } from './customer.controller';
const router = express.Router();

// Create: create customer
router.post("/create-customer", CustomerController.createCustomer);

// Read (All): getAllCategories
router.get("/getAllCustomers", CustomerController.getAllCustomer)

// Read (By ID): getCategoryById

// Update: updateCategoryById

// Delete: deleteCategoryById


export const CustomerRoutes = router;

