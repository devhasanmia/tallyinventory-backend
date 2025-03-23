import { RequestHandler } from "express";
import { SalesService } from "./sales.service";

// Create: create Customer
const createSales: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await SalesService.createSales(payload);
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const SalesController = {
    createSales
}
