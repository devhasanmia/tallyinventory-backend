import { RequestHandler } from "express";
import { ProductService } from "./product.service";

// Create: create Product
const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await ProductService.createProduct(payload);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// Read (All): getAllCategories
// Read (By ID): getCategoryById
// Update: updateCategoryById
// Delete: deleteCategoryById


// Export all controller functions
export const ProductController = {
    createProduct,
};
