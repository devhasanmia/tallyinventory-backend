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

        if (typeof payload.paidPayment !== 'number' || payload.paidPayment < 0) {
            throw new AppError(400, "'paidPayment' must be a valid non-negative number.");
        }

        if (payload.discount && (typeof payload.discount !== 'number' || payload.discount < 0)) {
            throw new AppError(400, "'discount' must be a valid non-negative number.");
        }

        if (payload.product.length === 0) {
            throw new AppError(400, "'product' array cannot be empty.");
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

        // Generate unique invoice number (if needed)
        // Example: payload.invoiceNumber = `INV-${Date.now()}`;

        // Set total amount and payment status
        payload.totalAmount = totalAmount;
        if (payload.paidPayment === totalAmount) {
            payload.paymentStatus = "Paid";
        } else if (payload.paidPayment >= 1) {
            payload.paymentStatus = "Partially Paid";
        } else {
            payload.paymentStatus = "Unpaid";
        }

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
