"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksRouter = void 0;
const express_1 = __importDefault(require("express"));
const statuses_1 = require("../statuses");
const tasks_repository_1 = require("../repositories/tasks-repository");
const getTasksRouter = () => {
    const pNewRouter = express_1.default.Router();
    pNewRouter.get('/', (req, res) => {
        var _a;
        const aFoundTasks = (0, tasks_repository_1.findTasks)((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
        res.status(statuses_1.HTTP_STATUSES.OK)
            .send(aFoundTasks);
    });
    pNewRouter.get('/:id([0-9]+)', (req, res) => {
        const pFoundTask = (0, tasks_repository_1.findTaskByID)(parseInt(req.params.id));
        if (!pFoundTask)
            res.status(statuses_1.HTTP_STATUSES.NOT_FOUND);
        else
            res.status(statuses_1.HTTP_STATUSES.OK)
                .send(pFoundTask);
    });
    pNewRouter.post('/', (req, res) => {
        const pCreatedTask = (0, tasks_repository_1.createTask)(req.body.title);
        if (!pCreatedTask)
            res.sendStatus(statuses_1.HTTP_STATUSES.BAD_REQUEST);
        else
            res.status(statuses_1.HTTP_STATUSES.CREATED)
                .send(pCreatedTask);
    });
    pNewRouter.put('/:id([0-9]+)', (req, res) => {
        const fIsTaskUpdated = (0, tasks_repository_1.updateTask)(parseInt(req.params.id), req.body.title);
        if (!fIsTaskUpdated)
            res.send(statuses_1.HTTP_STATUSES.NOT_FOUND);
        else
            res.status(statuses_1.HTTP_STATUSES.OK)
                .send((0, tasks_repository_1.findTaskByID)(parseInt(req.params.id)));
    });
    pNewRouter.delete('/:id([0-9]+)', (req, res) => {
        const fIsTaskDeleted = (0, tasks_repository_1.deleteTask)(parseInt(req.params.id));
        if (!fIsTaskDeleted)
            res.send(statuses_1.HTTP_STATUSES.NOT_FOUND);
        else
            res.send(statuses_1.HTTP_STATUSES.NO_CONTENT);
    });
    return pNewRouter;
};
exports.getTasksRouter = getTasksRouter;
