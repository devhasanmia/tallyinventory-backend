import mongoose, { ClientSession, mongo, Mongoose } from "mongoose";
import Sales from "./customer.model";
import { TSales } from "./sales.type";
import Product from "../Product/product.model";
import AppError from "../../utils/AppError";
import Customer from "../Customer/customer.model";
import { generateBarcode } from "../../utils/generateBarcode";

const createSales = async (payload: TSales) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Validate payload
        if (!payload || !Array.isArray(payload.product)) {
            throw new AppError(400, "Invalid payload: 'product' must be an array.");
        }

        let totalAmount: number = 0;

        // Calculate total amount
        for (const item of payload.product) {
            const isExist = await Product.findById(item.productId).session(session);
            if (!isExist) {
                throw new AppError(400, `Product with ID ${item.productId} not found.`);
            }
            totalAmount += isExist.sellingPrice * item.quantity;
        }

        // Apply discount
        if (payload.discount) {
            if (payload.discount > totalAmount) {
                throw new AppError(400, "Discount cannot exceed the total amount.");
            }
            totalAmount -= payload.discount;
        }

        // Update customer's due amount
        if (payload.paidPayment < totalAmount) {
            await Customer.findByIdAndUpdate(
                payload.customer,
                { $inc: { due: totalAmount - payload.paidPayment } },
                { session }
            );
        }

        // Generate unique invoice number
        
        // Set total amount
        payload.totalAmount = totalAmount;

        // Create sales entry
        const data = await Sales.create([payload], { session });

        await session.commitTransaction();
        return data[0];
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

export const SalesService = {
    createSales,
};
