import { RequestHandler } from "express";
import { StockService } from "./product.service";

// Create: stock Purchase
const stockPurchase: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await StockService.stockPurchase(payload);
        res.status(201).json({
            success: true,
            message: "Stock created successfully",
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
export const StockController = {
    stockPurchase,
};
