import { buildQuery } from "../../builder/QueryBuilder";
import AppError from "../../utils/AppError";
import { defaultCategory } from "../../utils/DefaultData/defaultCategory";
import Category from "./category.model";
import { TCategory } from "./category.type";

// Create: createCategory
const createCategory = async (payload: TCategory) => {
    try {
        const data = await Category.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};

// Read (All): getAllCategories
const getAllCategories = async (query: Record<string, unknown>) => {
    try {
        const modelQuery = Category.find();
        const searchableFields = ['name'];
        const { query: finalQuery, totalStats, } = await buildQuery(
            modelQuery,
            query,
            searchableFields,
        );
        const data = await finalQuery;;
        return {
            data,
            totalStats,
        };
    } catch (error) {
        throw error;
    }
};

// Read (By ID): getCategoryById
const getCategoryById = async (id: string) => {
    try {
        const data = await Category.findById(id);
        if (!data) {
            throw new Error("Category not found");
        }
        return data;
    } catch (error) {
        throw error;
    }
};

// Update: updateCategoryById
const updateCategoryById = async (id: string, payload: Partial<TCategory>) => {
    try {
        const defaultCategoryExist = await Category.findOne({
            name: defaultCategory.name,
        });
        if (defaultCategoryExist && defaultCategoryExist.id === id) {
            throw new AppError(400, "Cannot Update the Default Category");
        }
        const data = await Category.findByIdAndUpdate(id, payload, { new: true });
        if (!data) {
            throw new Error("Category not found");
        }
        return data;
    } catch (error) {
        throw error;
    }
};

// Delete: deleteCategoryById
const deleteCategoryById = async (id: string) => {
    try {
        const defaultCategoryExist = await Category.findOne({
            name: defaultCategory.name,
        });
        if (defaultCategoryExist && defaultCategoryExist.id === id) {
            throw new AppError(400, "Cannot Delete the Default Category");
        }
        const data = await Category.findByIdAndUpdate(id, {
            isDeleted: true
        }, { new: true })
        return data;
    } catch (error) {
        throw error;
    }
};

export const CategoriesService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
