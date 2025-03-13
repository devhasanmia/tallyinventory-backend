import { Types } from "mongoose";

export type TStockPurchase = {
    product: Types.ObjectId,
    dealer: string,
    quantity: number,
    purchasePrice: number,
    sellingPrice: number,
    totalPrice?: number,
    discount?: number,
    discountedPrice?: number,
    paymentMethod: "Cash" | "bKash" | "Nagad" | "Upay" | "Bank Payment",
    cashPayment?: number,
    due?: number,
    additionalCosts?: number,
    notes?: string,
    isDeleted?: string
};
