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
const getAllCategories = async () => {
    try {
        const data = await Category.find().sort("");
        return data;
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
        const data = await Category.findByIdAndDelete(id);
        if (!data) {
            throw new Error("Category not found");
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
