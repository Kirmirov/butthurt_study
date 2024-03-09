import express, {Response, Router} from 'express';
import { HTTP_STATUSES } from '../statuses';
import { RequestBody, RequestParams, RequestParamsAndBody, RequestQuery, TTask } from '../types';
import { TaskQueryModel } from '../dto/TaskQueryModel';
import { TaskViewModel } from '../dto/TaskViewModel';
import { TaskCreateModel } from '../dto/TaskCreateModel';
import { TaskURIParamsModel } from '../dto/TaskURIParamsModel';
import { TaskUpdateModel } from '../dto/TaskUpdateModel';
import { findTasks, findTaskByID, createTask, updateTask, deleteTask } from '../repositories/tasks-repository';

export const getTasksRouter = () => 
{
	const pNewRouter:Router = express.Router();
	
	pNewRouter.get('/', (req:RequestQuery<TaskQueryModel>, res:Response<Array<TaskViewModel>>) => {
		const aFoundTasks:Array<TTask> =  findTasks(req.query.title?.toString());
		res.status(HTTP_STATUSES.OK)
			.send(aFoundTasks);
	});
	
	pNewRouter.get('/:id([0-9]+)', (req:RequestParams<TaskURIParamsModel>, res:Response<TaskViewModel>) => {
		const pFoundTask:TTask|undefined = findTaskByID(parseInt(req.params.id));
		if (!pFoundTask)
			res.status(HTTP_STATUSES.NOT_FOUND);
		else
			res.status(HTTP_STATUSES.OK)
				.send(pFoundTask);
	});
	
	pNewRouter.post('/', (req:RequestBody<TaskCreateModel>, res:Response<TaskViewModel>) => {
		const pCreatedTask:TTask|null = createTask(req.body.title);
		if (!pCreatedTask)
			res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
		else
			res.status(HTTP_STATUSES.CREATED)
				.send(pCreatedTask);
	});
	
	pNewRouter.put('/:id([0-9]+)', (req:RequestParamsAndBody<TaskURIParamsModel, TaskUpdateModel>, res:Response) => {
		const fIsTaskUpdated:boolean = updateTask(parseInt(req.params.id), req.body.title);

		if (!fIsTaskUpdated)
			res.send(HTTP_STATUSES.NOT_FOUND);
		else
			res.status(HTTP_STATUSES.OK)
				.send(findTaskByID(parseInt(req.params.id)));
	});
	
	pNewRouter.delete('/:id([0-9]+)', (req:RequestParams<TaskURIParamsModel>, res:Response<number>) => {
		const fIsTaskDeleted:boolean = deleteTask(parseInt(req.params.id));
		if (!fIsTaskDeleted)
			res.send(HTTP_STATUSES.NOT_FOUND);
		else
			res.send(HTTP_STATUSES.NO_CONTENT)
	});

	return pNewRouter;
}