import { Router } from 'express';
import {
	getBoards,
	getSingleBoard,
	createBoard,
	updateBoard,
	deleteBoard,
} from '../controllers/boardControllers';

const router = Router();

// Get all the boards & create new board
router.route('/').get(getBoards).post(createBoard);

// Get a board - Update the board - delete the board
router
	.route('/:boardId')
	.get(getSingleBoard)
	.patch(updateBoard)
	.delete(deleteBoard);

export default router;
