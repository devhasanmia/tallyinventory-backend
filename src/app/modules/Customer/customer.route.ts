import express from 'express';
import { CustomerController } from './customer.controller';
import { upload } from '../../utils/sendImage';
const router = express.Router();

// Create: create customer
router.post("/create-customer", (req, res, next) => {
  upload.single("photo")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
}, CustomerController.createCustomer);


// Read (All): getAllCategories
router.get("/getAllCustomers", CustomerController.getAllCustomer)

// Read (By ID): getCategoryById

// Update: updateCategoryById

// Delete: deleteCategoryById


export const CustomerRoutes = router;

