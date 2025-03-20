import { model, Query, Schema } from "mongoose";
import { TProduct } from "./product.type";

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