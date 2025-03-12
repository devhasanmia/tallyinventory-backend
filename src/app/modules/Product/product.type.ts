import { Types } from "mongoose";

export type ProductType =
    "Physical Goods" |
    "Digital Products" |
    "Services" |
    "Experiential Products" |
    "Luxury Products" |
    "Raw Materials";

export type TProduct = {
    productType: ProductType;
    name: string,
    brand: string,
    category: Types.ObjectId,
    unit: Types.ObjectId,
    barcode: string,
    photo: string,
    dealer: string,
    quantity: string,
    purchasePrice: number,
    sellingPrice: number,
    totalPrice: number,
    discount: number,
    discountedPrice: number,
    paymentMethod: "Cash" | "bKash" | "Nagad" | "Upay" | "Bank Payment",
    additionalCosts: number,
    notes: string,
    isDeleted?: string
};
