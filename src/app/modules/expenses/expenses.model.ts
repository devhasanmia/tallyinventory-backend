import { model, Schema } from "mongoose";
import { TExpenses } from "./expenses.type";

const expensesSchema = new Schema<TExpenses>({
    expenses: {
        type: String,
    },
    amount: {
        type: Number,
    },
    note: {
        type: String,
    }
}, { timestamps: true });

const Expenses = model<TExpenses>("Expense", expensesSchema);

export default Expenses;
