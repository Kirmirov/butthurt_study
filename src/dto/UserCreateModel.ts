import { TTask } from "../types";

export type TaskCreateModel = {
	name: string;
	age: number,
	login: string,
	password: string,
	tasks_arr: Array<TTask>
};