import Sales from "./customer.model";
import { TSales } from "./sales.type";

const createSales = async (payload: TSales) => {
    try {
        const lastSale = await Sales.findOne().sort({ invoice: -1 });
        if (lastSale && lastSale.invoice) {
            const parts = lastSale.invoice.split("-");
            if (parts.length === 2 && !isNaN(Number(parts[1]))) {
                const prefix = parts[0];
                const currentNumber = parseInt(parts[1], 10);
                const nextInvoice = `${prefix}-${currentNumber + 1}`;
                payload.invoice = nextInvoice; 
            }
        } else {
            payload.invoice = "SALE-1";
        }
        const data = await Sales.create(payload);
        return data;
    } catch (error: any) {
        throw error;
    }
};


export const SalesService = {
    createSales,
};
