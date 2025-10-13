
import express from 'express';
const router = express.Router();
import { subscribeToLesson } from '../controllers/userController';
import {authMiddleware} from '../middleware/authMiddleware';
import { getSubscribedLessons } from '../controllers/lessonController';


router.post('/lessons/:id/subscribe', authMiddleware, subscribeToLesson);

router.get("/lessons", authMiddleware, getSubscribedLessons); 

export default router;
