import { buildQuery } from "../../builder/QueryBuilder";
import Expenses from "./expenses.model";
import { TExpenses } from "./expenses.type";


// Create: create Expenses
const createExpenses = async (payload: TExpenses) => {
    try {
        const data = await Expenses.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};

// Read (All): getAllExpenses
const getAllExpenses = async (query: Record<string, unknown>) => {
    try {
        const modelQuery = Expenses.find();
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