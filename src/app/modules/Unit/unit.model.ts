import { model, Query, Schema } from "mongoose";
import { TUnit } from "./unit.type";

const unitSchema = new Schema<TUnit>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        required: true,
        select: false,
        default: false
    }
}, { timestamps: true });


const methods = ["find", "findOne", "findById", "findOneAndUpdate"] as const;

methods.forEach((method: any) => {
    unitSchema.pre(method, function (this: Query<any, any>, next: () => void) {
        this.getQuery().isDelete = { $ne: true };
        next();
    });
});


unitSchema.pre("aggregate", function(next) {
    if (!this.pipeline()) {
        return next();
    }
    this.pipeline().unshift({
        $match: { isDelete: { $ne: true } }
    });
    next();
});

const Unit = model<TUnit>("Unit", unitSchema);

export default Unit