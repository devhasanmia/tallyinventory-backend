import { model, Query, Schema } from "mongoose";
import { TStock } from "./product.type";

const stockPurchaseSchema = new Schema<TStock>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        purchasePrice: {
            type: Number,
            required: true,
        },
        sellingPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },
        discount: {
            type: Number,
            required: true,
            default: 0
        },
        discountedPrice: {
            type: Number,
            required: true,
            default: 0
        },
        dealer: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "bKash", "Nagad", "Upay", "Bank Payment"],
            required: true
        },
        cashPayment: {
            type: Number,
            required: true
        },
        due: {
            type: Number,
            required: true
        },
        additionalCosts: {
            type: Number,
            required: true
        },
        notes: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false, 
        },
    },
    {
        timestamps: true,
    }
);


const methods = ["find", "findOne", "findById", "findOneAndUpdate"] as const;

methods.forEach((method: any) => {
    stockPurchaseSchema.pre(method, function (this: Query<any, any>, next: () => void) {
        this.getQuery().isDeleted = { $ne: true };
        next();
    });
});


stockPurchaseSchema.pre("aggregate", function(next) {
    if (!this.pipeline()) {
        return next();
    }
    this.pipeline().unshift({
        $match: { isDeleted: { $ne: true } }
    });
    next();
});

const ProductStock = model<TStock>("ProductStock", stockPurchaseSchema);

export default ProductStock