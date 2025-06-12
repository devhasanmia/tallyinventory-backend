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

// Read (All): getAllProducts
const getAllProducts: RequestHandler = async (req, res, next) => {
    const data = await ProductService.getAllProducts();
    res.status(200).json({
        success: true,
        message: "re",
        data
    })
}
// Read (By ID): getCategoryById
// Update: updateCategoryById
// Delete: deleteCategoryById

// Export all controller functions
export const ProductController = {
    createProduct,
    getAllProducts
};
