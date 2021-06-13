import { Server, Socket } from 'socket.io';
import amqp from 'amqplib/callback_api';


export function socketConnectionHandler(io: Server, socket: Socket) {
    socket.on('joinRoomEvent', (roomId: string) => {
        socket.join(roomId);
        console.log('user entered in room: ' + roomId);
        try {
            amqp.connect(process.env.RMQ_CONNECTION!, (err, conn) => {
                if (err) {
                    throw err;
                }
                conn.createChannel((err, ch) => {
                    if (err) {
                        throw err;
                    }
                    ch.assertQueue(roomId, { durable: false });
                    ch.consume(roomId, (msg) => {
                        const m = msg!.content.toString();
                        // console.log('Message received from RMQ');
                        io.sockets.to(roomId).emit('stateUpdateEvent', m);
                        ch.ack(msg!);
                        socket.disconnect();
                    });
                });
            });
        } catch (err) {
            socket.to(roomId).emit('errorOccured', err);
            socket.disconnect();
        }
    });

    socket.on('disconnect', (reason) => {
        console.log('user disconnected', reason);
    });
}