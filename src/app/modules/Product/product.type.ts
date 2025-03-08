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
    photo: string
    isDeleted?: string
};