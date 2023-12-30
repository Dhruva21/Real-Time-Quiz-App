"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const IoManager_1 = require("./managers/IoManager");
const UserManager_1 = require("./managers/UserManager");
const io = IoManager_1.IoManager.getIo();
const port = parseInt(process.env.PORT || '3000', 10);
io.listen(port);
const userManager = new UserManager_1.UserManager();
io.on('connection', (socket) => {
    userManager.addUser(socket);
});
