import { model, Schema } from "mongoose";
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

const Unit = model<TUnit>("Unit", unitSchema);

export default Unit