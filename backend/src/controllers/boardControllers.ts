import { Types } from 'mongoose';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
// Models
import Board from '../models/boardModel';
import Task from '../models/taskModel';
// Interfaces
import { IBoard, IColumn } from '../models/boardModel';

/**
 * @desc    Get all the boards
 * @route   /api/boards
 * @method  GET
 */
export const getBoards: RequestHandler = asyncHandler(async (req, res) => {
	const boards = await Board.find({});
	res.status(200).json(boards);
});

/**
 * @desc    Get a single board
 * @route   /api/boards/:boardId
 * @method  GET
 */
export const getSingleBoard: RequestHandler<{ boardId: string }> = asyncHandler(
	async (req, res) => {
		const { boardId } = req.params;

		// check if the id is in correct format
		if (!Types.ObjectId.isValid(boardId)) {
			throw new Error('No such board');
		}

		const board = await Board.findById(boardId);

		// if there's no board
		if (!board) {
			throw new Error('No such board');
		}

		// Add the tasks to each column accordingly
		for (const column of board.columns) {
			const tasks = await Task.find({ column }).sort('position');

			column.tasks = tasks;
		}

		res.status(200).json(board);
	}
);

/**
 * @desc    Create new board
 * @route   /api/boards
 * @method  POST
 */
export const createBoard: RequestHandler<
	{},
	{},
	{ name: string; columns: IColumn[] }
> = asyncHandler(async (req, res) => {
	const { name, columns } = req.body;

	// check if empty board name
	if (!name) {
		throw new Error("Can't be empty");
	}

	// check if there is empty column name
	if (columns) {
		for (const column of columns) {
			if (!column.name) {
				throw new Error("Can't be empty");
			}
		}
	}
	// Create new board
	const newBoard: IBoard = await Board.create({
		name,
		columns,
	});

	res.status(200).json(newBoard);
});

/**
 * @desc    Edit board
 * @route   /api/boards/:boardId
 * @method  PATCH
 */
export const updateBoard: RequestHandler<
	{ boardId: string },
	{},
	{ name: string; columns: IColumn[] }
> = asyncHandler(async (req, res) => {
	const { boardId } = req.params;
	const { name, columns } = req.body;

	// check if the id is in correct format
	if (!Types.ObjectId.isValid(boardId)) {
		throw new Error('No such board');
	}

	// Find the board
	const board = await Board.findById(boardId);

	// if there's no board
	if (!board) {
		throw new Error('No such board');
	}

	// validate columns
	if (columns) {
		for (const column of columns) {
			if (!column.name) {
				throw new Error("Can't be empty");
			}
		}
	}

	// Check for deleted column
	if (board.columns.length > columns.length) {
		for (const col of board.columns) {
			if (!columns.some((column) => column._id === col.id)) {
				// Delete all the related tasks
				await Task.deleteMany({ column: col });
			}
		}
	}

	// Update the board
	board.name = name;
	board.columns = columns as Types.DocumentArray<IColumn>;

	await board.save();

	res.status(200).json(board);
});

/**
 * @desc    Delete board
 * @route   /api/boards/:boardId
 * @method  DELETE
 */
export const deleteBoard: RequestHandler<{ boardId: string }, {}, {}> =
	asyncHandler(async (req, res) => {
		const { boardId } = req.params;

		// check if the id is in correct format
		if (!Types.ObjectId.isValid(boardId)) {
			throw new Error('No such board');
		}

		// Delete the board
		const board = await Board.findByIdAndDelete(boardId);

		// if there's no board
		if (!board) {
			throw new Error('No such board');
		}

		//  Delete tasks associate with each column
		for (const column of board.columns) {
			// Delete all the tasks
			await Task.deleteMany({ column });
		}

		res.status(200).json({ success: true });
	});
