import { RequestHandler } from "express";
import Category from "./category.model";

// Create: createCategory
const createCategory: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await Category.create(payload);

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// Read (All): getAllCategories
const getAllCategories: RequestHandler = async (req, res, next) => {
    try {
        const data = await Category.find();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// Read (By ID): getCategoryById
const getCategoryById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Category.findById(id);
        res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// Update: updateCategoryById
const updateCategoryById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const data = await Category.findByIdAndUpdate(id, payload, { new: true });
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// Delete: deleteCategoryById
const deleteCategoryById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Category.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// Export all controller functions
export const CategoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
