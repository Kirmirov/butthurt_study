// import { Pool } from 'pg';
// export const pool = new Pool({
// 	user: 'kirmirov',
// 	password: 'admin123',
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'my_data_base'
// });


import { TDB } from '../types';

export const db: TDB = {
	tasks: [
		{id:1, title:'первый'}, 
		{id:2, title:'второй'}, 
		{id:3, title:'третий'}
	],
};