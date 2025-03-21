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



export const ExpensesService = {
    createExpenses
}