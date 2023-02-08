import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
// Routes
import boardRoutes from './routes/boardRoutes';
import taskRoutes from './routes/taskRoutes';

const PORT = process.env.PORT || 8000;

// Connect to db
connectDB();

// Initialize the app
const app = express();

// allow send raw json
app.use(express.json());
// allow send urlencoded form
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

// middleware
app.use(errorHandler);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, '../../frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
	);
} else {
	// development mode
	app.get('/', (req, res) => {
		res
			.status(200)
			.json({ message: 'Welcome to the Kanban Task Management WebApp API' });
	});
}

// Listen to the app
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
