
import ProductStock from "./product.model";
import { TStockPurchase } from "./product.type";

// Create: Stock Purchase
const stockPurchase = async (payload: TStockPurchase) => {
    try {
        const data = await ProductStock.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};

// Read (All): getAllCategories

// Read (By ID): getCategoryById


// Update: updateCategoryById


// Delete: deleteCategoryById

export const StockService = {
    stockPurchase
};
