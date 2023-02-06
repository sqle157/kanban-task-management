import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
// Models
import Task from '../models/taskModel';
import Board from '../models/boardModel';
// Interfaces
import { ISubtask } from '../models/taskModel';

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
	// Count the number of task in the column
	const taskCount = await Task.count({ column });

	// if there is no board
	if (!board) {
		throw new Error('No such board!');
	}

	// check if columnId is empty
	if (!column) {
		res.status(401);
		throw new Error('Please provide a columnId');
	}

	// Find the target column in the board
	const targetedColumn = board.columns.find((col) => col.id === column);

	if (!targetedColumn) {
		throw new Error('No such column!');
	}

	// if title is empty
	if (!title) {
		res.status(401);
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

	// Create new task
	const newTask = await Task.create({
		title,
		description,
		status,
		column,
		position: taskCount ? taskCount : 0,
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
		title: string;
		description: string;
		subtasks: ISubtask[];
		status: string;
		column: string;
		position: number;
	}
> = asyncHandler(async (req, res) => {
	const { taskId } = req.params;
	const { title, description, subtasks, status, column, position } = req.body;

	// Save the old version of the task before update
	const task = await Task.findById(taskId);

	// If there is no such task
	if (!task) {
		res.status(404);
		throw new Error('No such task');
	}

	// Check title empty
	if (!title) {
		throw new Error("Can't be empty");
	}

	// check subtask title
	if (subtasks.length >= 1) {
		for (const subtask of subtasks) {
			if (!subtask.title) {
				throw new Error("Can't be empty");
			}
		}
	}

	// Update the task - new task version
	const updatedTask = await Task.findByIdAndUpdate(
		taskId,
		{ title, description, subtasks, status, column, position },
		{ new: true }
	);

	// If there is an error
	if (!updatedTask) {
		res.status(401);
		throw new Error('Something is wrong with the update functionality!');
	}

	// Fetch the task lists based on the column property of the old task version and the request body
	const sourceTaskList = await Task.find({ column: task.column }).sort(
		'position'
	);
	const destinationTaskList = await Task.find({ column }).sort('position');

	// Update source task list if the column is different
	if (task.column.toString() !== column) {
		for (const key of sourceTaskList.keys()) {
			if (
				!(await Task.findByIdAndUpdate(sourceTaskList[key]._id, {
					position: key,
				}))
			) {
				res.status(401);
				throw new Error(
					'Something is wrong with updating in the source task list!'
				);
			}
		}
	}

	// Update the destination task list
	for (const key of destinationTaskList.keys()) {
		if (
			!(await Task.findByIdAndUpdate(destinationTaskList[key]._id, {
				position: key,
			}))
		) {
			res.status(401);
			throw new Error(
				'Something is wrong with updating in the desitnation task list!'
			);
		}
	}

	res.status(200).json(updatedTask);
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

		res.status(200).json({
			success: true,
		});
	}
);
