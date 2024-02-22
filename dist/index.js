"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const statuses_1 = require("./statuses");
const PORT = process.env.PORT || 5050;
app_1.app.get('/', (req, res) => {
    res.status(statuses_1.HTTP_STATUSES.OK)
        .send('<h1>Hello World!!!</h1>');
});
app_1.app.listen(PORT, () => {
    console.log('Server was started on port ' + PORT);
});
