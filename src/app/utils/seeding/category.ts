import Category from "../../modules/Category/category.model";
import { defaultCategory } from "../DefaultData/defaultCategory";

export const defaultCategorySeed = async () => {
    try {
        // Check if the Category already exists
        const unitExists = await Category.findOne(
            {
                name: defaultCategory.name,
            }
        );
        if (!unitExists) {
            await Category.create(defaultCategory)
            console.log(`✔️ Success: The Category ${defaultCategory.name} was added to the system!`)
        }
    } catch (error) {
        console.error("Error adding default Category:", error);
    }
}