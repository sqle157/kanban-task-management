import { connect } from 'mongoose';

// Connect to the database
export const connectDB = async () => {
	try {
		const conn = await connect(process.env.MONGO_URI!);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`ERROR: ${(error as Error).message}`);
		process.exit(1);
	}
};
