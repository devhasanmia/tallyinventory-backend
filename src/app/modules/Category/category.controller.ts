import { RequestHandler } from "express";
import Category from "./category.model";
import { CategoriesService } from "./category.service";

// Create: createCategory
const createCategory: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await CategoriesService.createCategory(payload);
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
        const data = await CategoriesService.getAllCategories(req.query);
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: data.data,
            totalStats: data.totalStats
        });

    } catch (error) {
        next(error);
    }
};

// Read (By ID): getCategoryById
const getCategoryById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await CategoriesService.getCategoryById(id);
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
        const data = await CategoriesService.updateCategoryById(id, payload);
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
        const data = await CategoriesService.deleteCategoryById(id);
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
