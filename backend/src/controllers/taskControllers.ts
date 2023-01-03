import { Types } from 'mongoose';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
// Models
import Task from '../models/taskModel';
import Board from '../models/boardModel';
// Interfaces
import { ITask, ISubtask } from '../models/taskModel';

/**
 * @desc    Get All Tasks
 * @route   /api/tasks
 * @method  POST
 */
export const getTasks: RequestHandler = asyncHandler(async (req, res) => {
	const tasks = await Task.find({});

	res.status(200).json(tasks);
});

/**
 * @desc    Create Task
 * @route   /api/tasks
 * @method  POST
 */
export const createTask: RequestHandler<
	{},
	{},
	{
		title: string;
		description?: string;
		subtasks: ISubtask[];
		status: string;
		column: string;
		boardId: string;
	}
> = asyncHandler(async (req, res) => {
	const { title, description, subtasks, status, column, boardId } = req.body;

	const board = await Board.findById(boardId);

	// if there is no board
	if (!board) {
		throw new Error('No such board!');
	}

	// Find the target column in the board
	const targetedColumn = board.columns.find((col) => col.id === column);

	if (!targetedColumn) {
		throw new Error('No such column!');
	}

	// if title is empty
	if (!title) {
		throw new Error("Can't be empty");
	}

	// check each subtask title
	if (subtasks.length >= 1) {
		for (const subtask of subtasks) {
			if (!subtask.title) {
				res.status(401);
				throw new Error("Can't be empty");
			}
		}
	}

	// check if columnId is empty
	if (!column) {
		res.status(401);
		throw new Error('Please provide a columnId');
	}

	// Create new task
	const newTask = await Task.create({
		title,
		description,
		status,
		column,
		subtasks,
	});

	res.status(200).json(newTask);
});

/**
 * @desc    Update Task
 * @route   /api/tasks/:taskId
 * @method  PATCH
 */
export const updateTask: RequestHandler<
	{ taskId: string },
	{},
	{
		title?: string;
		description?: string;
		subtasks?: ISubtask[];
		status?: string;
	}
> = asyncHandler(async (req, res) => {
	const { taskId } = req.params;
	const { title, description, subtasks, status } = req.body;

	// Check title empty
	if (title && title === '') {
		res.status(401);
		throw new Error("Can't be empty");
	}

	// check subtask title
	if (subtasks && subtasks.length >= 1) {
		for (const subtask of subtasks) {
			if (!subtask.title) {
				res.status(401);
				throw new Error("Can't be empty");
			}
		}
	}

	// Update the task
	const task = await Task.findByIdAndUpdate(
		taskId,
		{ title, description, subtasks, status },
		{ new: true }
	);

	// if there's no task
	if (!task) {
		res.status(404);
		throw new Error('No such task');
	}

	res.status(200).json(task);
});

/**
 * @desc    Delete Task
 * @route   /api/tasks/:taskId
 * @method  DELETE
 */
export const deleteTask: RequestHandler<{ taskId: string }> = asyncHandler(
	async (req, res) => {
		const { taskId } = req.params;

		// Delete task
		const task = await Task.findByIdAndDelete(taskId);

		// if there is no task
		if (!task) {
			res.status(404);
			throw new Error('No such task');
		}

		res.status(200).json(task);
	}
);
