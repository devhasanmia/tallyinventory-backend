import { Schema, model } from "mongoose";
import { TUser } from "./user.type";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    organizationName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    nid: {
        type: String,
    },
    birthCertificate: {
        type: String
    },
    designation: {
        type: String,
        enum: [
            "Business Owner",
            "Sales Executive"
        ],
        required: true
    },
    salary: {
        type: String,
    },
    joiningDate: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    verification: {
        type: String,
        enum: ["verified", "unverified", "pending"],
        default: "pending"
    },
}, { timestamps: true })


const User = model<TUser>("User", userSchema);

export default User