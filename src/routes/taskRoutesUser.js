import express from 'express';
import { getMyTasks } from '../controllers/taskUserController.js'; // Pastikan path ini benar
import { authenticate,  } from '../middleware/auth.js'; // Impor middleware otentikasi

const router = express.Router();

router.use(authenticate);

router.get('/my-tasks', getMyTasks);
export default router;