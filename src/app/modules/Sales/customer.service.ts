import Product from "../Product/product.model";
import Sales from "./customer.model";
import { TSales } from "./sales.type";

// Create: Create a new Sale
const createSales = async (payload: TSales) => {
    try {

        let totalAmount = 0;

        const dbproduct = await Product.findById(payload.product.forEach((product)=> product._id));
        

        payload.product.forEach((product) => {
            dbproduct?.sellingPrice * p
            totalAmount += product.subTotal;
        });

        payload.totalAmount = totalAmount;

        const lastSale = await Sales.findOne().sort({ createdAt: -1 });
        // Generate the next invoice number
        const nextInvoice = lastSale?`SALE-${parseInt(lastSale.invoice.split("-")[1]) + 1}`: "SALE-1";
        payload.invoice = nextInvoice;
        // Create the new sale
        const data = await Sales.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};

export const SalesService = {
    createSales,
};
