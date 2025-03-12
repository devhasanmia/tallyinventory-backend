import { model, Schema } from "mongoose";
import { TExpenses } from "./category.type";

const expensesSchema = new Schema<TExpenses>({
    expenses: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Expenses = model<TExpenses>("Expenses", expensesSchema);

export default Expenses