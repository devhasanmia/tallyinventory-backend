import { RequestHandler } from "express";
import { CustomerService } from "./customer.service";

// Create: create Customer
const createCustomer: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await CustomerService.createCustomer(payload);
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
// const getAllCategories: RequestHandler = async (req, res, next) => {
//     try {
//         const data = await CategoriesService.getAllCategories(req.query);
//         res.status(200).json({
//             success: true,
//             message: "Categories retrieved successfully",
//             data: data.data,
//             totalStats: data.totalStats
//         });

//     } catch (error) {
//         next(error);
//     }
// };

export const CustomerController = {
    createCustomer
}
