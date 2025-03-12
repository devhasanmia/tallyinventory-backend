import { buildQuery } from "../../builder/QueryBuilder";
import Expenses from "./category.model";
import Category from "./category.model";
import { TExpenses } from "./category.type";


// Create: createCategory
const createExpenses = async (payload: TExpenses) => {
    try {
        const data = await Expenses.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};

// Read (All): getAllCategories
const getAllCategories = async (query: Record<string, unknown>) => {
    try {
        const modelQuery = Category.find();
        const searchableFields = ['name'];
        const { query: finalQuery, totalStats, } = await buildQuery(
            modelQuery,
            query,
            searchableFields,
        );
        const data = await finalQuery;;
        return {
            data,
            totalStats,
        };
    } catch (error) {
        throw error;
    }
};

export const ExpensesService = {
    createExpenses
}