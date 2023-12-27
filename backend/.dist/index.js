"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoManager_1 = require("./managers/IoManager");
const io = IoManager_1.IoManager.getIo();
io.on('connection', (client) => {
    client.on('event', data => {
        const type = data.type;
        console.log(data);
    });
    client.on('disconnect', () => { });
});
io.listen(3000);
