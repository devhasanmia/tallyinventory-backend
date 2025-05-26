import {applySort, buildQuery } from "../../builder/QueryBuilder";
import AppError from "../../utils/AppError";
import { defaultUnit } from "../../utils/DefaultData/defaultUnit";
import Unit from "./unit.model";
import { TUnit } from "./unit.type";

// Create: create Unit
const createUnit = async (payload: TUnit) => {
    try {
        const data = await Unit.create(payload);
        return data
    } catch (error) {
        throw error
    }
}

// Read (All): getAllUnits
const getAllUnits = async (query: Record<string, unknown>) => {
    try {
        const modelQuery = Unit.find().sort();
        const searchableFields = ['name', 'abbreviation'];
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
        const defaultUnitExist = await Unit.findOne({
            name: defaultUnit.name,
            abbreviation: defaultUnit.abbreviation
        });
        if (defaultUnitExist && defaultUnitExist.id === id) {
            throw new AppError(400, "Cannot Update the Default Unit");
        }
        const updateUnit = await Unit.findByIdAndUpdate(id, payload, { new: true })
        return updateUnit
    } catch (error) {
        throw error
    }
}
// Delete: deleteUnitById
const deleteUnitById = async (id: string) => {
    try {
        const defaultUnitExist = await Unit.findOne({
            name: defaultUnit.name,
            abbreviation: defaultUnit.abbreviation
        });
        if (defaultUnitExist && defaultUnitExist.id === id) {
            throw new AppError(400, "Cannot delete the Default Unit");
        }
        const deletedUnit = await Unit.findByIdAndDelete(id)
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