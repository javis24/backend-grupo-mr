import express from "express";
import { getTrafficLightStatus, updateTrafficLightStatus } 
from "../controllers/TrafficLightController.js";

const router = express.Router();

router.get('/traffic-light/:id', getTrafficLightStatus);
router.patch('/traffic-light/:id', updateTrafficLightStatus);

export default router;
