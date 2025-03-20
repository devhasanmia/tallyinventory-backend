
import Product from "./product.model";
import { TProduct } from "./product.type";

// Create: Create Product
const createProduct = async (payload: TProduct) => {
    try {
        const data = await Product.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};


// Read (All): getAllCategories

// Read (By ID): getCategoryById


// Update: updateCategoryById


// Delete: deleteCategoryById

export const ProductService = {
    createProduct
};
