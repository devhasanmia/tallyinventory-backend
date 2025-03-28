import { Types } from "mongoose";
export interface TProduct {
    productId: string | Types.ObjectId; // MongoDB ObjectId (as string or ObjectId)
    quantity: number; // Quantity of the product
}
export type TSales = {
    invoice: string;
    customer: Types.ObjectId;
    orderStatus: "Placed" | "Confirmed" | "Shipped" | "Delivered" | "Canceled";  
    product: TProduct;
    discount?: number;
    totalAmount?: number;
    paidPayment: number;
    paymentStatus?: "Paid" | "Unpaid" | "Partially Paid";
    notes?: string;
};
