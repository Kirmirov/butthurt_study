"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonBodyMiddleware = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const tasks_router_1 = require("./routes/tasks-router");
exports.app = (0, express_1.default)();
exports.jsonBodyMiddleware = express_1.default.json();
exports.app.use(exports.jsonBodyMiddleware);
const pTasksRouter = (0, tasks_router_1.getTasksRouter)();
exports.app.use('/tasks', pTasksRouter);
