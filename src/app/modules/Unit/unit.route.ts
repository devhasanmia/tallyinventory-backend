import express from 'express';
import { UnitController } from './unit.controller';
const router = express.Router();

// Create: create Unit
router.post("/create-unit", UnitController.createUnit);
// Read (All): getAllUnits
router.get("/getAllUnits", UnitController.getAllUnits);
// Read (By ID): getUnitById
router.get("/getUnitById/:id", UnitController.getUnitById);
// Update: updateUnitById
router.put("/updateUnitById/:id", UnitController.updateUnitById);
// Delete: deleteUnitById
router.delete("/deleteUnitById/:id", UnitController.deleteUnitById)
export const UnitRoutes = router;

