import { model, Schema } from "mongoose";
import { TCustomer } from "./customer.type";

const customerSchema = new Schema<TCustomer>({
    photo: {
        type: String,
        default: "/avater.png"
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "N/A"
    },
    address: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    due: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Customer = model<TCustomer>("Customer", customerSchema);

export default Customer;
