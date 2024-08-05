import express from "express";
import { getBusinessUnits, getBusinessUnitById, createBusinessUnit, updateBusinessUnit, deleteBusinessUnit } 
from "../controllers/BusinessUnit.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/business-units', verifyUser, getBusinessUnits);
router.get('/business-units/:id', verifyUser, getBusinessUnitById);
router.post('/business-units', verifyUser, createBusinessUnit);
router.put('/business-units/:id', verifyUser, updateBusinessUnit);
router.delete('/business-units/:id', verifyUser, deleteBusinessUnit);

export default router;
