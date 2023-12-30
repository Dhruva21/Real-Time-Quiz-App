import endpoint from './endpoints.config';
import { IoManager } from './managers/IoManager';
import { UserManager } from './managers/UserManager';

const io = IoManager.getIo();

const port: number = Number(endpoint.PORT);

io.listen(port);

const userManager = new UserManager();
io.on('connection', (socket) => {
  userManager.addUser(socket);
});
  