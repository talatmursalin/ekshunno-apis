import amqp from 'amqplib/callback_api';
import { Router, Request, Response } from 'express';
import Languages from '../models/languages';
import { getRandomName } from '../utils/methods';

const router = Router();

router.get('/languages', (req: Request, res: Response) => {
    Languages.find()
        .then((data: JSON) => {
            res.status(200).json(data);
        })
        .catch((err: JSON) => {
            res.status(400).json(err);
        })
});


router.post('/code/submit', (req: Request, res: Response) => {
    amqp.connect(process.env.RMQ_CONNECTION!, (err, conn) => {
        if (err) {
            res.status(500).json(err);
        }
        conn.createChannel((chErr, channel) => {
            if (chErr) {
                res.status(500).json(err);
            }
            const queueName: string = process.env.RMQ_SUBMISSION_CHANNEL!;
            const roomName = getRandomName(5);
            const msg = {
                submissionRoom: roomName,
                submission: req.body.submission,
            }
            channel.assertQueue(queueName, { durable: true });
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
            conn.close();
            res.status(200).json({
                submissionRoom: roomName,
                message: 'Submission queued'
            })
        });
    })
})

export default router;