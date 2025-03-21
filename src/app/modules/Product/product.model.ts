import { model, Query, Schema, startSession } from "mongoose";
import { TProduct } from "./product.type";
import Expenses from "../Expenses/expenses.model";

const productSchema = new Schema<TProduct>(
    {
        productType: {
            type: String,
            enum: [
                "Physical Goods",
                "Digital Products",
                "Services",
                "Experiential Products",
                "Luxury Products",
                "Raw Materials",
            ],
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", 
            required: true,
        },
        unit: {
            type: Schema.Types.ObjectId,
            ref: "Unit",
            required: true,
        },
        barcode: {
            type: String,
            unique: true,
            default: "12345678"
        },
        photo: {
            type: String,
            required: true,
            default: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
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
            default: 0
        },
        discount: {
            type: Number,
            default: 0
        },
        discountedPrice: {
            type: Number,
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
            default: 0
        },
        additionalCosts: {
            type: Number,
            default: 0
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



productSchema.pre("save", async function(next) {
    const product = this;
    try {
        const discount = product.discount || 0;
        const cashPayment = product.cashPayment || 0;
        // Calculate totalPrice
        product.totalPrice = product.quantity * product.purchasePrice;
        // Calculate discountedPrice
        product.discountedPrice = product.totalPrice - discount;
        // Calculate due
        product.due = product.discountedPrice - cashPayment;
        next();
    } catch (error:any) {
        return next(error); 
    }
});



const methods = ["find", "findOne", "findById", "findOneAndUpdate"] as const;

methods.forEach((method: any) => {
    productSchema.pre(method, function (this: Query<any, any>, next: () => void) {
        this.getQuery().isDeleted = { $ne: true };
        next();
    });
});


productSchema.pre("aggregate", function(next) {
    if (!this.pipeline()) {
        return next();
    }
    this.pipeline().unshift({
        $match: { isDeleted: { $ne: true } }
    });
    next();
});

const Product = model<TProduct>("Product", productSchema);

export default Product