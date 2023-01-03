import { Schema, Types, model } from 'mongoose';
import { ITask } from './taskModel';

// Column definition
export interface IColumn {
	_id: Types.ObjectId;
	id?: string;
	name: string;
	tasks: ITask[];
}

// Board definition
export interface IBoard {
	name: string;
	columns: Types.DocumentArray<IColumn>;
	// creator: Types.ObjectId;
}

const boardSchema = new Schema<IBoard>({
	name: {
		type: String,
		required: true,
	},
	columns: [
		{
			name: {
				type: String,
				required: true,
			},
			tasks: Array<ITask>,
		},
	],
	// creator: {
	// 	type: Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User',
	// },
});

export default model<IBoard>('Board', boardSchema);
