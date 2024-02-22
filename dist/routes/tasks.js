"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksRouter = void 0;
const express_1 = __importDefault(require("express"));
const statuses_1 = require("../statuses");
const getTasksRouter = (a_pDB) => {
    const pNewRouter = express_1.default.Router();
    pNewRouter.get('/', (req, res) => {
        if (req.query.title) {
            const strSearch = decodeURIComponent(req.query.title.toString());
            const aFilteredDB = a_pDB.tasks.filter((pTask) => pTask.title.includes(strSearch));
            res.status(statuses_1.HTTP_STATUSES.OK)
                .json(aFilteredDB);
        }
        else
            res.status(statuses_1.HTTP_STATUSES.OK)
                .json(a_pDB.tasks);
    });
    pNewRouter.get('/:id([0-9]+)', (req, res) => {
        const pFoundTask = a_pDB.tasks.find((pTask) => pTask.id === parseInt(req.params.id));
        if (!pFoundTask)
            res.status(statuses_1.HTTP_STATUSES.NOT_FOUND)
                .send('<h1>Не найдено</h1>');
        else
            res.status(statuses_1.HTTP_STATUSES.OK)
                .send(pFoundTask);
    });
    pNewRouter.post('/', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(statuses_1.HTTP_STATUSES.BAD_REQUEST);
            return;
        }
        const pCreatedTasks = {
            id: Number(new Date()),
            title: req.body.title,
        };
        a_pDB.tasks.push(pCreatedTasks);
        res.status(statuses_1.HTTP_STATUSES.CREATED)
            .json(pCreatedTasks);
    });
    pNewRouter.put('/:id([0-9]+)', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND);
            return;
        }
        const pTask = a_pDB.tasks.find((pTask) => pTask.id === parseInt(req.params.id));
        if (!pTask) {
            res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND);
            return;
        }
        else {
            pTask.title = req.body.title;
            res.status(statuses_1.HTTP_STATUSES.NO_CONTENT)
                .send(JSON.stringify(pTask));
        }
    });
    pNewRouter.delete('/:id([0-9]+)', (req, res) => {
        a_pDB.tasks = a_pDB.tasks.filter((pTask) => pTask.id !== parseInt(req.params.id));
        res.status(statuses_1.HTTP_STATUSES.NO_CONTENT)
            .send(`The task with id ${req.params.id} was deleted`);
    });
    return pNewRouter;
};
exports.getTasksRouter = getTasksRouter;
