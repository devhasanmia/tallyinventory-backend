import { RequestHandler } from "express";
import { ProductService } from "./product.service";
import { generateBarcode } from "../../utils/generateBarcode";

// Create: create Product
const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const barcode = generateBarcode();
        payload.barcode = barcode;
        const data = await ProductService.createProduct(payload);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
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
