import { model, Schema } from "mongoose";
import { TSales } from "./sales.type";

const salesSchema = new Schema<TSales>(
    {
        invoice: {
            type: String,
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },
        product: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            }
        ],
        orderStatus: {
            type: String,
            enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Canceled"],
            default: "Placed"
        },
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            default: 0
        },
        paidPayment: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Paid", "Unpaid", "Partially Paid"],
            required: true,
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);



const Sales = model<TSales>("Sale", salesSchema);

export default Sales;
