import Unit from "./unit.model";
import { TUnit } from "./unit.type";

// Create: create Unit
const createUnit = async(payload: TUnit) => {
    try {
        const data = await Unit.create(payload);
        return data
    } catch (error) {
        throw error
    }
}

// Read (All): getAllUnits
const getAllUnits = async () => {
    try {
        const data = await Unit.find();
        return data
    } catch (error) {
        throw error
    }
}

// Read (By ID): getUnitById
const getUnitById = async (id: string) => {
    try {
        const data = await Unit.findById(id);
        return data
    } catch (error) {
        throw error
    }
}
// Update: updateUnitById
const updateUnitById = async (id: string, payload: TUnit) => {
    try {
        const updateUnit = await Unit.findByIdAndUpdate(id,payload,{new:true})
        return updateUnit
    } catch (error) {
        throw error
    }
}
// Delete: deleteUnitById
const deleteUnitById = async (id: string) => {
    try {
        const deletedUnit = await Unit.findByIdAndUpdate(id, {
            isDelete: true
        }, {new: true})
        return deletedUnit
    } catch (error) {
        throw error
    }
}


export const UnitService = {
    createUnit,
    getAllUnits,
    getUnitById,
    updateUnitById,
    deleteUnitById
}