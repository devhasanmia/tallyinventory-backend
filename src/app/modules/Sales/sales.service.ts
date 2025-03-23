import Sales from "./customer.model";
import { TSales } from "./sales.type";

const createSales = async (payload: TSales) => {
    try {
        const data = await Sales.create(payload);
        return data;
    } catch (error: any) {
        throw error;
    }
};

export const SalesService = {
    createSales,
};
