import { model, Schema } from "mongoose";
import { TSales } from "./sales.type";

const salesSchema = new Schema<TSales>(
    {
        invoice: {
            type: String,
            unique: true,
            default: "SALE-1"
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
        status: {
            type: String,
            enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Canceled"],
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
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


// salesSchema.pre("save", async function (next) {
//     const sales = this;

//     // Skip if invoice is already set (e.g., during updates)
//     if (sales.invoice) {
//         return next();
//     }

//     try {
//         // Query the database to find the latest invoice
//         const latestSale = await mongoose.model("Sales").findOne().sort({ invoice: -1 });

//         let nextInvoice;
//         if (latestSale && latestSale.invoice) {
//             const parts = latestSale.invoice.split("-");
//             console.log(parts)
//         } else {
//             nextInvoice = "SALE-1";
//         }

//         sales.invoice = nextInvoice; // Assign the generated invoice
//         next();
//     } catch (error) {
//         next(error); // Pass errors to Mongoose
//     }
// });



const Sales = model<TSales>("Sale", salesSchema);

export default Sales;
