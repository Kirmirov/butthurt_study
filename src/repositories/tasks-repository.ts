import { db } from '../db/db';
import { TTask } from '../types';

export const findTasks = (a_strTitle:string):Array<TTask> => {
	if (a_strTitle)
		return db.tasks.filter((pTask:TTask) => 
				pTask.title.includes(a_strTitle));
	else
		return db.tasks
};

export const findTaskByID = (a_nID:number):TTask|undefined => {
	return db.tasks.find((pTask:TTask) => 
			pTask.id === a_nID);
};

export const createTask = (a_strTitle:string):TTask|null => {
	if (a_strTitle)
	{
		const pNewTask:TTask = {
			id: Number(new Date()),
			title: a_strTitle,
		};
		db.tasks.push(pNewTask);
		return pNewTask;
	}
	else
		return null;
};

export const updateTask = (a_nID:number, a_strTitle:string):boolean => {
	const pFoundTask:TTask|undefined = findTaskByID(a_nID);
	if (pFoundTask && a_strTitle)
	{	
		pFoundTask.title = a_strTitle;
		return true;
	}
	else
		return false;
};

export const deleteTask = (a_nID:number):boolean => {
	const pFoundTask:TTask|undefined = findTaskByID(a_nID);
	if (pFoundTask)
	{
		db.tasks = db.tasks.filter((pTask:TTask) => 
					pTask.id !== a_nID);
		return true;
	}
	else
		return false;
};