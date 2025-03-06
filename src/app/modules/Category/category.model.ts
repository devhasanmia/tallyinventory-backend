import { model, Query, Schema } from "mongoose";
import { TCategory } from "./category.type";

const categorySchema = new Schema<TCategory>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        select: false,
        default: false
    }
}, { timestamps: true });


const methods = ["find", "findOne", "findById", "findOneAndUpdate"] as const;

methods.forEach((method: any) => {
    categorySchema.pre(method, function (this: Query<any, any>, next: () => void) {
        this.getQuery().isDeleted = { $ne: true };
        next();
    });
});


categorySchema.pre("aggregate", function(next) {
    if (!this.pipeline()) {
        return next();
    }
    this.pipeline().unshift({
        $match: { isDeleted: { $ne: true } }
    });
    next();
});

const Category = model<TCategory>("Category", categorySchema);

export default Category