import { RequestHandler } from "express"
import { UnitService } from "./unit.service";


// Create: create Unit
const createUnit: RequestHandler = async (req, res, next) => {
    try {
        const data = await UnitService.createUnit(req.body);
        res.status(201).json({
            success: true,
            message: "Unit created successfully",
            data
        });
    } catch (error) {
        next(error)
    }
}
// Read (All): getAllUnits
const getAllUnits: RequestHandler = async (req, res, next) => {
    try {
        const data = await UnitService.getAllUnits();
        res.status(200).json({
            success: true,
            message: "Unit fetched successfully",
            data
        });
    } catch (error) {
        next(error)
    }
}
// Read (By ID): getUnitById
const getUnitById: RequestHandler = async (req, res, next) => {
    try {
        const data = await UnitService.getUnitById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Unit fetched successfully",
            data
        });
    } catch (error) {
        next(error)
    }
}
// Update: updateUnitById
const updateUnitById: RequestHandler = async (req, res, next) => {
    try {
        const data = await UnitService.updateUnitById(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Unit Update successfully",
            data
        });
    } catch (error) {
        next(error)
    }
}
// Delete: deleteUnitById
const deleteUnitById: RequestHandler = async (req, res, next) => {
    try {
        await UnitService.deleteUnitById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Unit Deleted successfully",
            data: []
        });
    } catch (error) {
        next(error)
    }
}

// Export Unit Controller
export const UnitController = {
    createUnit,
    getAllUnits,
    getUnitById,
    updateUnitById, 
    deleteUnitById
}