import app from './index';
import { socketConnectionHandler } from './socket'
import http from 'http';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';

mongoose.connect(process.env.MONGO_DB_CONNECTION!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => {
        console.log('connected to database');
    }
);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.ALLOWED_HOST,
        credentials: true
    },
});

server.listen(PORT);

io.on('connection', (socket: Socket) => {
    console.log('client connected: ' + socket.id);
    socketConnectionHandler(io, socket);
});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('Listening on ' + PORT);
});
