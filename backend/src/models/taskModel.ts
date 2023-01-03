import { Schema, Types, model } from 'mongoose';

// Subtask definition
export interface ISubtask {
	_id: Types.ObjectId;
	title: string;
	isCompleted: boolean;
}

// Task definition
export interface ITask {
	title: string;
	description?: string;
	status: string;
	column: Types.ObjectId;
	subtasks: Types.DocumentArray<ISubtask>;
}

const taskSchema = new Schema<ITask>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: '',
	},
	status: {
		type: String,
		required: true,
	},
	column: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Column',
	},
	subtasks: [
		{
			title: {
				type: String,
				required: true,
			},
			isCompleted: {
				type: Boolean,
				required: true,
				default: false,
			},
		},
	],
});

export default model<ITask>('Task', taskSchema);
