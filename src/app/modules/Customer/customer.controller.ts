import { RequestHandler } from "express";
import { CustomerService } from "./customer.service";

// Create: create Customer
const createCustomer: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await CustomerService.createCustomer(req.file, payload);
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// Read (All): getAllCategories
const getAllCustomer: RequestHandler = async (req, res, next) => {
    try {
        const data = await CustomerService.getAllCustomers();
        res.status(200).json({
            success: true,
            message: "Customer retrieved successfully",
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export const CustomerController = {
    createCustomer,
    getAllCustomer
}
