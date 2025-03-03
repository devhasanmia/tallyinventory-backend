import Unit from "../../modules/Unit/unit.model"
import { defaultUnit } from "../DefaultData/defaultUnit";

export const defaultUnitSeed = async () => {
    try {
        // Check if the unit already exists
        const unitExists = await Unit.findOne(
            {
                name: defaultUnit.name,
                abbreviation: defaultUnit.abbreviation
            }
        );
        if (!unitExists) {
            await Unit.create(defaultUnit)
            console.log(`✔️ Success: The unit ${defaultUnit.name} was added to the system!`)
        }
    } catch (error) {
        console.error("Error adding default units:", error);
    }
}