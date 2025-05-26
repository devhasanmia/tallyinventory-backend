import Customer from "./customer.model";
import { TCustomer } from "./customer.type";




// Create: create Customer
const createCustomer = async (payload: TCustomer) => {
    try {
        const data = await Customer.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};

// Read (All): getAllCustomers
const getAllCustomers = async () => {
    try {
        const data = await Customer.find();
        return data;
    } catch (error) {
        throw error;
    }
};



export const CustomerService = {
    createCustomer,
    getAllCustomers
}