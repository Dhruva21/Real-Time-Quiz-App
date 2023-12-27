import http from 'http';
import { IoManager } from './managers/IoManager';

const io = IoManager.getIo();

io.on('connection', (client) => {
    client.on('event', data => { 
        const type = data.type;
        console.log(data);
    });
    client.on('disconnect', () => {/* _ */});
})

io.listen(3000);
