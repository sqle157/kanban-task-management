import { Router } from 'express';
import {
	createTask,
	deleteTask,
	getTasks,
	updateTask,
} from '../controllers/taskControllers';

const router = Router();

// Get & Create task
router.route('/').get(getTasks).post(createTask);

// Update & Delete task
router.route('/:taskId').patch(updateTask).delete(deleteTask);

export default router;
