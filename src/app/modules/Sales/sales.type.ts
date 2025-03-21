import { Types } from "mongoose";

export type TSales = {
    invoice: string;
    customer: Types.ObjectId;
    status: "Placed" | "Confirmed" | "Shipped" | "Delivered" | "Canceled";  
    product: Types.ObjectId[];
    discount?: number;
    totalAmount?: number;
    paidPayment: number;
    paymentStatus: "Paid" | "Unpaid" | "Partially Paid";
    notes?: string;
};
