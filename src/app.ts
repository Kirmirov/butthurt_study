import express, { Router } from 'express';
import { getTasksRouter } from './routes/tasks-router';

export const app 				= express();

export const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const pTasksRouter:Router 		= getTasksRouter();
app.use('/tasks', pTasksRouter);




