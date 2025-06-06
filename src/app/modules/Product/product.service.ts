
import mongoose from "mongoose";
import Product from "./product.model";
import { TProduct } from "./product.type";
import Expenses from "../expenses/expenses.model";

// Create: Create Product
const createProduct = async (payload: TProduct) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const additionalCosts = payload.additionalCosts || 0;
        if (additionalCosts > 0) {
            await Expenses.create([{
                expenses: "Other expenses",
                amount: additionalCosts,
                note: "Other expenses when purchasing the product"
            }], { session });
        }
        const data = await Product.create([payload], { session });
        await session.commitTransaction();
        session.endSession();
        return data;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
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
