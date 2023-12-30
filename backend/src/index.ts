require("dotenv").config();
import { IoManager } from './managers/IoManager';
import { UserManager } from './managers/UserManager';

const io = IoManager.getIo();

const port: number = parseInt(process.env.PORT || '3000', 10);
io.listen(port);

const userManager = new UserManager();
io.on('connection', (socket) => {
  userManager.addUser(socket);
});
  