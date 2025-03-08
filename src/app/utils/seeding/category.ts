import Category from "../../modules/Category/category.model";
import { defaultCategory } from "../DefaultData/defaultCategory";

export const defaultCategorySeed = async () => {
    try {
        const categoryExists = await Category.findOne({ name: "Uncategorized" });
        if (!categoryExists) {
            await Category.create(defaultCategory);
            console.log(`✔️ Success: The Category "${defaultCategory.name}" was added to the system!`);
        }
    } catch (error) {
        throw error;
    }
};
