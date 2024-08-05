import express from "express";
import { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } 
from "../controllers/Company.js";
import { verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/companies', verifyUser, getCompanies);
router.get('/companies/:id', verifyUser, getCompanyById);
router.post('/companies', verifyUser, createCompany);
router.put('/companies/:id', verifyUser, updateCompany);
router.delete('/companies/:id', verifyUser, deleteCompany);

export default router;
