import { Socket } from 'socket.io';
import amqp from 'amqplib/callback_api';


export function socketConnectionHandler(socket: Socket) {
    socket.on('joinRoomEvent', (roomId: string) => {
        console.log('user wants to join in room: ' + roomId);
        socket.join(roomId);
        try {
            amqp.connect(process.env.RMQ_CONNECTION!, (err, conn) => {
                if (err) {
                    throw err;
                }
                conn.createChannel((err, ch) => {
                    if (err) {
                        throw err;
                    }
                    ch.assertQueue(roomId, { durable: true });
                    ch.consume(roomId, (msg) => {
                        const m = msg!.content.toString();
                        console.log('new msg in queue->', m);
                        socket.to(roomId).emit('stateUpdateEvent', m);
                        console.log('msg emitted');
                        ch.ack(msg!);
                        console.log('msg ack')
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