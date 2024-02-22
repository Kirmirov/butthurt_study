"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.findTaskByID = exports.findTasks = void 0;
const db_1 = require("../db/db");
const findTasks = (a_strTitle) => {
    if (a_strTitle)
        return db_1.db.tasks.filter((pTask) => pTask.title.includes(a_strTitle));
    else
        return db_1.db.tasks;
};
exports.findTasks = findTasks;
const findTaskByID = (a_nID) => {
    return db_1.db.tasks.find((pTask) => pTask.id === a_nID);
};
exports.findTaskByID = findTaskByID;
const createTask = (a_strTitle) => {
    if (a_strTitle) {
        const pNewTask = {
            id: Number(new Date()),
            title: a_strTitle,
        };
        db_1.db.tasks.push(pNewTask);
        return pNewTask;
    }
    else
        return null;
};
exports.createTask = createTask;
const updateTask = (a_nID, a_strTitle) => {
    const pFoundTask = (0, exports.findTaskByID)(a_nID);
    if (pFoundTask && a_strTitle) {
        pFoundTask.title = a_strTitle;
        return true;
    }
    else
        return false;
};
exports.updateTask = updateTask;
const deleteTask = (a_nID) => {
    const pFoundTask = (0, exports.findTaskByID)(a_nID);
    if (pFoundTask) {
        db_1.db.tasks = db_1.db.tasks.filter((pTask) => pTask.id !== a_nID);
        return true;
    }
    else
        return false;
};
exports.deleteTask = deleteTask;
