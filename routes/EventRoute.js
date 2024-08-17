import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/Event.js';
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/events', verifyUser, createEvent);
router.get('/events', verifyUser, getEvents);
router.patch('/events/:id', verifyUser, updateEvent);
router.delete('/events/:id', verifyUser, deleteEvent);

export default router;
