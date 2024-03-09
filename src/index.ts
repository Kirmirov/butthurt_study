import { app } from './app';
import { Request, Response } from 'express';
import { HTTP_STATUSES } from './statuses';

const PORT = process.env.PORT || 5050;

app.get('/', (req:Request, res:Response) => {
	res.status(HTTP_STATUSES.OK)
		.send('<h1>Hello World!!!</h1>')
});
 
app.listen(PORT, () => {
	console.log('Server was started on port ' + PORT);
});